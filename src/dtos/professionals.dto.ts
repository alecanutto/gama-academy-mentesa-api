// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsString, Length, IsInt } from 'class-validator';

export class CreateProfessionalDto {
  @IsString()
  @Length(3, 150)
  public name: string;

  @IsInt()
  public userId: number;
}
