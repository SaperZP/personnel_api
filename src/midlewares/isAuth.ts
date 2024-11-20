import {NextFunction, Request, Response} from 'express';
import PersonnelModel from "../models/Personnel.model";

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {

  if (req.session?.id) {
    const user = await PersonnelModel.findById(req.session.id);

    if (!user) {
      throw new Error('User not Found!');
    }

    req.user = user;
    req.isLogin = true;
  }

  next();
}
