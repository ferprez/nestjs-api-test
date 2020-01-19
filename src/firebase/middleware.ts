import firebase from "./init";
import { Injectable, NestMiddleware, HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { Response } from "express";
import { IAuthRequest } from "../interfaces/IAuthRequest";

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: IAuthRequest, res: Response, next: Function) {

    if(req.originalUrl === "/user" && req.method === "POST") {
      return next();
    }

    const { authorization } = req.headers;
    // Bearer ezawagawg.....
    if(!authorization) {
      throw new HttpException({ message: "Must provide authorization header" }, HttpStatus.BAD_REQUEST);
    }
    const token = authorization.slice(7);

    const user = await firebase
      .auth()
      .verifyIdToken(token)
      .catch(err => {
        throw new HttpException(
          { message: "Input data validation failed", err },
          HttpStatus.UNAUTHORIZED
        );
      });
    console.log(user);
    req.user = user;
    next();
  }
}
