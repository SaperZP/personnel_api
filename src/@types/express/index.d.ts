// express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      session?: any; // Adjust to your session type
      isLogin?: boolean; // Adjust as necessary
    }
  }
}
