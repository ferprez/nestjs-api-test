import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['debug', 'error', 'log', 'warn'] });
  app.use(helmet());
  app.enableCors({ origin: "*" });
  await app.listen(3000);
}
bootstrap();
