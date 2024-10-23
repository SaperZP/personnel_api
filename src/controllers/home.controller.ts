import {Request, Response} from 'express';

export const homePath = (req: Request, res: Response): void => {
  res.send({
    error: false,
    message: 'Welcome to PERSONNEL API',
    session: req?.session,
    isLogin: req?.isLogin,
  });
};
