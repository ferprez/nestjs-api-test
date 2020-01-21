import { Injectable } from "@nestjs/common";
import { validate } from "class-validator";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user";
import firebase from "../firebase/init";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async findById(id: string) {
    this.userModel.findById(id);
  }

  async findOne(params: any) {
    const user = await this.userModel.findOne({ ...params }).exec();
    if (!user) {
      return null;
    }
    const { uid, username, email, firstName, lastName } = user;
    console.log(user);
    return { uid, email, firstName, lastName, username };
  }

  async create(dto: CreateUserDto) {
    const { email, password } = dto;
    const userExists = await this.findOne({ email });
    if (userExists) {
      const errorBody = { id: `user with email ${email} already exist` };
      throw new HttpException(
        { message: "Input data validation failed", errorBody },
        HttpStatus.CONFLICT
      );
    }

    const userRecord = await firebase.auth().createUser({ email, password });
    const user = new this.userModel({ uid: userRecord.uid, ...dto });
    const result = await user.save();

    return result;
  }
}
