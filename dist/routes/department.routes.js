"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const department_controller_1 = __importDefault(require("../controllers/department.controller"));
const router = express_1.default.Router();
router.route('/')
    .get(department_controller_1.default.listDepartments)
    .post(department_controller_1.default.createDepartment);
router.route('/:id')
    .get(department_controller_1.default.readDepartment)
    .put(department_controller_1.default.updateDepartment)
    .patch(department_controller_1.default.updateDepartment)
    .delete(department_controller_1.default.deleteDepartment);
exports.default = router;
