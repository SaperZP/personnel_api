import {Request, Response, NextFunction} from 'express';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(res.errorStatus || 500).send({
    error: true,
    message: error.message
  })
}
