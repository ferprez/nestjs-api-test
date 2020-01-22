import { Injectable } from "@nestjs/common";
// import { Stitch } from "mongodb-stitch-server-sdk";
const { Stitch, AnonymousCredential } = require("mongodb-stitch-server-sdk");

@Injectable()
export class AppService {
  getStitchInstance() {
    return null;
  }
}
