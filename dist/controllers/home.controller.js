"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homePath = void 0;
const homePath = (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PERSONNEL API',
        session: req === null || req === void 0 ? void 0 : req.session,
        isLogin: req === null || req === void 0 ? void 0 : req.isLogin,
    });
};
exports.homePath = homePath;
