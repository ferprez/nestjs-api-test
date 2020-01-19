import { Get, Post, Body, Controller, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user";
import { IAuthRequest } from "../interfaces/IAuthRequest";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Req() request: IAuthRequest, @Body("user") userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }
}
