import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly username: string;
  // @IsNotEmpty()
  // readonly age: number;
  // @IsNotEmpty()
  // readonly avatarUrl: string;
}
