import { ExpressAdapter } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import * as express from "express";
import * as functions from "firebase-functions";
import { AppModule } from "./app.module";

const server = express();

export const createNestServer = async expressInstance => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );
  return app.init();
};

createNestServer(server)
  .then(() => console.log("Nest ready"))
  .catch(err => console.log("Nest broken", err));

export const api = functions.https.onRequest(server);
