import {NextFunction, Request, Response} from "express";
import {Document, FilterQuery, Model, PopulateOptions, SortOrder} from "mongoose";
import isValidObject from "../helpers/isValidObject";
import {PAGE_SIZE} from "../config/environment";

export const query = async (req: Request, res: Response, next: NextFunction) => {

  // Filter
  const filter: Record<string, any> = isValidObject(req.query?.filter)
      ? (req.query.filter as Record<string, any>)
      : {};

  // Search
  const rawSearch = isValidObject(req.query?.search)
      ? (req.query.search as Record<string, any>)
      : {};
  const search: FilterQuery<Document> = {};

  for (const key in rawSearch) {
    const value = rawSearch[key];
    if (typeof value === "string") {
      search[key] = {$regex: value, $options: "i"};
    }
  }

  // Sort
  const rawSort = req.query?.sort || {};
  const sort: Record<string, SortOrder> = {};
  if (typeof rawSort === "object" && !Array.isArray(rawSort)) {
    for (const [key, value] of Object.entries(rawSort)) {
      if (value === "asc" || value === "desc") {
        sort[key] = value === "asc" ? 1 : -1;
      }
    }
  }

  // Pagination
  let limit = Number(req.query?.limit);
  limit = limit>0 ? limit: Number(PAGE_SIZE) || 20
  // Page
  // URL?page=2&limit=5
  let page = Number(req.query?.page)
  page= page>0 ? (page-1) : 0

  // Skip
  let skip = Number(req.query?.skip)
  skip = skip>0 ? skip:(page*limit)

  // Custom Methods
  res.getModelList = async function <T extends Document>(
      Model: Model<T>,
      populate?: PopulateOptions | (string | PopulateOptions)[]
  ): Promise<T[]> {
    let query = Model.find({...filter, ...search}).sort(sort).limit(limit).skip(skip);
    if (populate) {
      query = query.populate(populate);
    }
    return await query.exec();
  };

  res.getModelListDetails = async function <T extends Document>(
      Model: Model<T>
  ): Promise<{
    filter: object;
    search: object;
    sort: object;
    limit: number;
    pages: {
      previous: number | false;
      current: number;
      next: number | false;
      total: number;
    } | false;
    count: number;
  }> {
    const data = await Model.find({...filter, ...search});
    const total = Math.ceil(data.length / limit);

    return {
      filter,
      search,
      sort,
      limit,
      pages: data.length > limit
          ? {
            previous: page > 0 ? page : false,
            current: page + 1,
            next: page + 2 > total ? false : page + 2,
            total,
          }
          : false,
      count: data.length,
    };
  };

  next();
};
