import {Request, Response} from 'express';
import DepartmentModel from "../models/Department.model";

const listDepartments = async (req: Request, res: Response) => {
  const data = await DepartmentModel.find({});

  res.status(200).send({
    error: false,
    data,
    count: data.length
  })
}

const createDepartment = async (req: Request, res: Response) => {
  const name = req.body.name;
  const data = await DepartmentModel.create({name});

  res.status(201).send({
    error: false,
    data
  })
}

const readDepartment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await DepartmentModel.findById(id);

  res.status(200).send({
    error: false,
    data,
  })

}

const updateDepartment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await DepartmentModel.findByIdAndUpdate(id, req.body, {runValidators: true, returnDocument: "after"});
  res.status(200).send({
    error: false,
    data,
  })
}

const deleteDepartment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await DepartmentModel.findByIdAndDelete(id);

  res.status(200).send({
    error: false,
    data,
  })

}

export default {listDepartments, createDepartment, readDepartment, updateDepartment, deleteDepartment};
