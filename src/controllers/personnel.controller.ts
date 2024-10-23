import {Request, Response} from 'express';
import PersonnelModel from "../models/Personnel.model";

const listPersonnel = async (req: Request, res: Response) => {
  const data = await PersonnelModel.find();

  res.status(200).send({
    error: false,
    data,
    count: data.length
  })
}

const createPersonnel = async (req: Request, res: Response) => {
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
