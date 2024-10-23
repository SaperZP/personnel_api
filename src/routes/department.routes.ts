import express from "express";
import departmentController from "../controllers/department.controller";

const router = express.Router();

router.route('/')
    .get(departmentController.listDepartments)
    .post(departmentController.createDepartment);

router.route('/:id')
    .get(departmentController.readDepartment)
    .put(departmentController.updateDepartment)
    .patch(departmentController.updateDepartment)
    .delete(departmentController.deleteDepartment);

export default router;
