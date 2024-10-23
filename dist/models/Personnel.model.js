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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const personnelSchema = new mongoose_1.Schema({
    departmentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
        match: [
            /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/g,
            "Please enter a valid phone number"
        ],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            "Please enter a valid email address"
        ]
    },
    title: {
        type: String,
        trim: true,
        required: [true, "Title is required"],
    },
    salary: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        trim: true,
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isLead: {
        type: Boolean,
        default: false,
    },
    startedAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });
personnelSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield (0, bcryptjs_1.genSalt)(12);
        this.password = yield (0, bcryptjs_1.hash)(this.password, salt);
        next();
    });
});
personnelSchema.methods.checkPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, bcryptjs_1.compare)(enteredPassword, this.password);
    });
};
exports.default = (0, mongoose_1.model)("Personnel", personnelSchema);
