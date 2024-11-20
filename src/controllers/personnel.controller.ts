import {Request, Response} from 'express';
import PersonnelModel from "../models/Personnel.model";
import ErrorResponse from "../helpers/ErrorResponse";

const listPersonnel = async (req: Request, res: Response) => {
  let data;

  if (!req.isLogin) {
    throw new ErrorResponse(403, "Authentication required!");
  }

  if (req.user?.isLead) {
    req.query.filter = {departmentId: req.user.departmentId} as Record<string, any>;
    data = await res.getModelList(PersonnelModel, {path: 'departmentId', select: 'name'})
  }

  if (req.user?.isAdmin) {
    data = await res.getModelList(PersonnelModel, {path: 'departmentId', select: 'name'})
  }

  if (req.user?.isLead || req.user?.isAdmin) {
    const data = await PersonnelModel.find();

    res.status(200).send({
      error: false,
      data,
      count: data.length
    })

  } else {
    throw new ErrorResponse(403, "Not authorized!");
  }
}

const createPersonnel = async (req: Request, res: Response) => {
  if (req.body.isLead) {
    await PersonnelModel.updateMany({departmentId: req.body.departmentId, isLead: true}, {isLead: false})
  }

  const data = await PersonnelModel.create(req.body);

  res.status(201).send({
    error: false,
    data
  })
}

const readPersonnel = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await PersonnelModel.findById(id);

  res.status(200).send({
    error: false,
    data,
  })
}

const updatePersonnel = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await PersonnelModel.findById(id);

  if (!user) {
    throw new Error('User not Found!');
  }

  if (req.body.isLead) {
    await PersonnelModel.updateMany({departmentId: user.departmentId, isLead: true}, {isLead: false});
  }

  const data = await PersonnelModel.findByIdAndUpdate(id, req.body, {runValidators: true, returnDocument: "after"});
  res.status(200).send({
    error: false,
    data,
  })
}

const deletePersonnel = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await PersonnelModel.findByIdAndDelete(id);

  res.status(200).send({
    error: false,
    data,
  })
}

export default {listPersonnel, createPersonnel, readPersonnel, updatePersonnel, deletePersonnel};
