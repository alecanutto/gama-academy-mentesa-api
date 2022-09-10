// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsString, IsEmail, MaxLength, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'senha deve ser do tipo string' })
  @Length(8, 20, { message: 'senha deve conter entre 8 e 20 caracteres' })
  public password: string;
}

export class LoginUserDto extends UpdateUserDto {
  @IsEmail({}, { message: 'email é inválido' })
  @MaxLength(60, { message: 'email excede o máximo de 60 caracteres' })
  public email: string;
}

export class CreateUserDto extends LoginUserDto {
  @IsString({ message: 'nome deve ser do tipo string' })
  @Length(3, 150)
  public name: string;
}
