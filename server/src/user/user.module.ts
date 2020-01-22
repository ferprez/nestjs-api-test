import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserSchema } from "./user.model";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
