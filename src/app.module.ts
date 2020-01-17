import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products/products.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

const DB_URL = `mongodb+srv://ferprez:admin123@cluster01-pkdxv.gcp.mongodb.net/products?retryWrites=true&w=majority`;

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(DB_URL),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
