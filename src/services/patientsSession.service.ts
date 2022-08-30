import { PatientsSession, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreatePatientsSessionDto } from '@/dtos/patientsSession.dto';

class PatientsSessionService {
  public patientsSession = new PrismaClient().patientsSession;

  public async create(patientsSessionData: CreatePatientsSessionDto): Promise<PatientsSession> {
    if (isEmpty(patientsSessionData)) throw new HttpException(400, 'patientsSessionData is empty');

    const createPatientsSessionData: Promise<PatientsSession> = this.patientsSession.create({
      data: { ...patientsSessionData },
    });
    return createPatientsSessionData;
  }

  public async findAllPatientsSession(sessionId: number): Promise<PatientsSession[]> {
    if (isEmpty(sessionId)) throw new HttpException(400, 'sessionId is empty');

    const allPatientsSessions: PatientsSession[] = await this.patientsSession.findMany({ where: { sessionId } });
    return allPatientsSessions;
  }
}

export default PatientsSessionService;
