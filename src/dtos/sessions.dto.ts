// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsString, Length, IsInt, MaxLength, IsDate, IsArray } from 'class-validator';
import { Patient } from '@prisma/client';

export class CreateSessionDto {
  @IsString()
  @Length(3, 150)
  public subject: string;

  @IsString()
  @MaxLength(30)
  public type: string;

  @IsString()
  @MaxLength(20)
  public status: string;

  @IsString()
  @MaxLength(30)
  public scheduleType: string;

  @IsInt()
  public duration: number;

  @IsDate()
  public sessionDate: Date;

  @IsInt()
  public professionalId: number;

  @IsArray()
  public patients: Patient[];
}
