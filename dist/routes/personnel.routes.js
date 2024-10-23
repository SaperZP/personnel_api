"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personnel_controller_1 = __importDefault(require("../controllers/personnel.controller"));
const router = express_1.default.Router();
router.route('/')
    .get(personnel_controller_1.default.listPersonnel)
    .post(personnel_controller_1.default.createPersonnel);
router.route('/:id')
    .get(personnel_controller_1.default.readPersonnel)
    .put(personnel_controller_1.default.updatePersonnel)
    .patch(personnel_controller_1.default.updatePersonnel)
    .delete(personnel_controller_1.default.deletePersonnel);
exports.default = router;
