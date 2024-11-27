import express from "express";
import "express-async-errors"; //MUST, MUST, MUST be here!!! Right after importing express!!!
import "colors";
import {PORT, HOST, SECRET_KEY} from "./config/environment";
import db from "./config/db";
import cookieSession from "cookie-session";
import {homePath} from "./controllers/home.controller";
import departmentRoutes from "./routes/department.routes";
import personnelRoutes from "./routes/personnel.routes";
import authRoutes from "./routes/auth.routes";
import {errorHandler} from "./midlewares/errorHandler";
import log from "./midlewares/logger";
import {isAuth} from "./midlewares/isAuth";
import {query} from "./midlewares/query";
import cors from 'cors';


const startServer = async () => {
  const app = express();
  const port = Number(PORT) || 3000;
  const host = process.env?.HOST || "127.0.0.1";

  await db();

  app.use(log);
  app.use(express.json());
  app.use(cors());
  app.use(cookieSession({secret: SECRET_KEY, maxAge: 1000*60*15}));
  app.use(isAuth);
  app.use(query);

  app.get('/', homePath);
  app.use('/auth', authRoutes);
  app.use('/departments', departmentRoutes);
  app.use('/personnels', personnelRoutes);

  app.use('/', errorHandler);

  app.listen(port, host, () => {
    console.log(`Server is ready at http://${HOST}:${PORT}`.green);
  });
}

startServer();
