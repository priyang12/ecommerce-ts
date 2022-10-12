import * as express from "express";

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
      orinialUrl: string;
      userModal: any;
      file: any;
    }
  }
}
