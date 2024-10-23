import express from "express";
import "colors";
import {homePath} from "./controllers/home.controller";
import {PORT, HOST, SECRET_KEY} from "./config/environment";
import db from "./config/db";
import departmentRoutes from "./routes/department.routes";
import personnelRoutes from "./routes/personnel.routes";
import authRoutes from "./routes/auth.routes";
import cookieSession from "cookie-session";


const startServer = async () => {
  const app = express();
  const port = Number(PORT) || 3000;
  const host = process.env?.HOST || "127.0.0.1";

  await db();
  app.use(express.json());
  app.use(cookieSession({secret: SECRET_KEY}))

  app.get('/', homePath);
  app.use('/auth', authRoutes);
  app.use('/departments', departmentRoutes);
  app.use('/personnels', personnelRoutes);

  app.listen(port, host, () => {
    console.log(`Server is ready at http://${HOST}:${PORT}`.green);
  });
}

startServer();
