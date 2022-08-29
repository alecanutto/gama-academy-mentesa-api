// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsString, IsEmail, MaxLength, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @MaxLength(60)
  public email: string;

  @IsString()
  @Length(8, 20)
  public password: string;
}

export class CreateUserDto extends LoginUserDto {
  @IsString()
  @Length(3, 150)
  public name: string;
}

export class UpdateUserDto {
  @IsString()
  @Length(8, 20)
  public password: string;
}
