"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Personnel_model_1 = __importDefault(require("../models/Personnel.model"));
const listPersonnel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Personnel_model_1.default.find();
    res.status(200).send({
        error: false,
        data,
        count: data.length
    });
});
const createPersonnel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Personnel_model_1.default.create(req.body);
    res.status(201).send({
        error: false,
        data
    });
});
const readPersonnel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield Personnel_model_1.default.findById(id);
    res.status(200).send({
        error: false,
        data,
    });
});
const updatePersonnel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield Personnel_model_1.default.findByIdAndUpdate(id, req.body, { runValidators: true, returnDocument: "after" });
    res.status(200).send({
        error: false,
        data,
    });
});
const deletePersonnel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield Personnel_model_1.default.findByIdAndDelete(id);
    res.status(200).send({
        error: false,
        data,
    });
});
exports.default = { listPersonnel, createPersonnel, readPersonnel, updatePersonnel, deletePersonnel };
