import { Request } from "express";
import { IFirebaseUser } from "./IFirebaseUser";

export interface IAuthRequest extends Request {
  user: any;
  firebaseUser: IFirebaseUser;
}
