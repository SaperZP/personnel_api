import express from "express";
import personnelController from "../controllers/personnel.controller";

const router = express.Router();

router.route('/')
    .get(personnelController.listPersonnel)
    .post(personnelController.createPersonnel);

router.route('/:id')
    .get(personnelController.readPersonnel)
    .put(personnelController.updatePersonnel)
    .patch(personnelController.updatePersonnel)
    .delete(personnelController.deletePersonnel);

export default router;
