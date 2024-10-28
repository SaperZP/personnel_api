// express.d.ts
// noinspection ES6UnusedImports
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      session?: any;
      isLogin?: boolean;
    }

    interface Response {
      errorStatus: number;
    }
  }
}
