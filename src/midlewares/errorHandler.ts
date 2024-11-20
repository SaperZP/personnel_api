import {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import ErrorResponse from "../helpers/ErrorResponse";

export const errorHandler = (
    err: Error | mongoose.Error,
    req: Request,
    res: Response,
    next: NextFunction) => {
  let error = new ErrorResponse(500, err.message || 'Server Error');

  // Mongoose bad ObjectId
  if (err instanceof mongoose.Error.CastError) {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(404, message);
  }

  // Mongoose duplicate Key
  if ('code' in err && err.code === 11000) {
    const message = `Duplicate field value entered`
    error = new ErrorResponse(400, message)
  }

  // Mongoose Validation Errors
  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors || {}).map((val) => val.message).join(', ');
    error = new ErrorResponse(400, message);
  }

  res.status(error.status || 500).send({
    error: true,
    message: error.message
  })
}
