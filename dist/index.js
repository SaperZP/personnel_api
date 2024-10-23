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
const express_1 = __importDefault(require("express"));
require("colors");
const home_controller_1 = require("./controllers/home.controller");
const environment_1 = require("./config/environment");
const db_1 = __importDefault(require("./config/db"));
const department_routes_1 = __importDefault(require("./routes/department.routes"));
const personnel_routes_1 = __importDefault(require("./routes/personnel.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const app = (0, express_1.default)();
    const port = Number(environment_1.PORT) || 3000;
    const host = ((_a = process.env) === null || _a === void 0 ? void 0 : _a.HOST) || "127.0.0.1";
    yield (0, db_1.default)();
    app.use(express_1.default.json());
    app.use((0, cookie_session_1.default)({ secret: environment_1.SECRET_KEY }));
    app.get('/', home_controller_1.homePath);
    app.use('/auth', auth_routes_1.default);
    app.use('/departments', department_routes_1.default);
    app.use('/personnels', personnel_routes_1.default);
    app.listen(port, host, () => {
        console.log(`Server is ready at http://${environment_1.HOST}:${environment_1.PORT}`.green);
    });
});
startServer();
