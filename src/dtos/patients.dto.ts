// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsString, Length, IsInt, MaxLength, IsDate } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @Length(3, 150)
  public name: string;

  @IsString()
  @Length(11, 14)
  public cpf: string;

  @IsString()
  @MaxLength(15)
  public email: string;

  @IsString()
  @MaxLength(15)
  public gender: string;

  @IsString()
  @Length(11, 15)
  public cellphone: string;

  @IsDate()
  public birthDate: Date;

  @IsInt()
  public professionalId: number;
}
