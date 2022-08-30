// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsInt } from 'class-validator';

export class CreatePatientsSessionDto {
  @IsInt()
  public sessionId: number;

  @IsInt()
  public patientId: number;
}
