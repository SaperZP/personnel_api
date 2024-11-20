// express.d.ts
// noinspection ES6UnusedImports
import * as express from 'express';
import {IPersonnel} from "../../models/Personnel.model";
import {ParsedQs} from "qs";

declare global {
  namespace Express {
    interface Request {
      session?: any;
      isLogin?: boolean;
      user?: IPersonnel;
      // customQuery: ParsedQs & {
      //   filter?: Record<string, any>;
      //   search?: Record<string, string>;
      //   sort?: Record<string, 'asc' | 'desc'>;
      //   limit?: string;
      //   page?: string;
      //   skip?: string;
      // };
    }

    interface Response {
      getModelList: (Model: Model<T>, populate?: any) => Promise<T[]>;
      getModelListDetails: <T extends Document>(Model: Model<T>) => Promise<{
        filter: object;
        search: object;
        sort: object;
        limit: number;
        pages: { previous: number | false; current: number; next: number | false; total: number; } | boolean;
        count: number;
      }>
      errorStatus: number;
    }
  }
}
