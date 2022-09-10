import { PrismaClient, Session } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateSessionDto } from '@/dtos/sessions.dto';
import { CreatePatientsSessionDto } from '@/dtos/patientsSession.dto';

class SessionService {
  public sessions = new PrismaClient().session;
  public patientsSessionService = new PrismaClient().patientsSession;

  public async create(sessionData: CreateSessionDto): Promise<Session> {
    if (isEmpty(sessionData)) throw new HttpException(400, 'Nenhum dado foi informado');

    const createSessionData: Promise<Session> = this.sessions.create({ data: { ...sessionData, 
      sessionDate: new Date(sessionData.sessionDate) }, include: { PatientsSession: true } });
    return createSessionData;
  }

  public async findAllSession(professionalId: number): Promise<Session[]> {
    if (isEmpty(professionalId)) throw new HttpException(400, 'Id do profissional não foi informado');

    const allSessions: Session[] = await this.sessions.findMany({ where: { professionalId } });
    return allSessions;
  }

  public async findSessionById(sessionId: number): Promise<Session> {
    if (isEmpty(sessionId)) throw new HttpException(400, 'Id da sessão não foi informado');

    const findSession: Session = await this.sessions.findUnique({ where: { id: sessionId } });
    if (!findSession) throw new HttpException(409, "Sessão inexistente");

    return findSession;
  }

  public async updateSession(sessionId: number, sessionData: CreateSessionDto): Promise<Session> {
    if (isEmpty(sessionData)) throw new HttpException(400, 'Nenhum dado foi informado');

    const findSession: Session = await this.sessions.findUnique({ where: { id: sessionId } });
    if (!findSession) throw new HttpException(409, "Sessão inexistente");

    await this.patientsSessionService.deleteMany({ where: { sessionId } });
        
    const patients: number[] = sessionData.patients;
    delete sessionData.patients;

    patients.forEach(async patient => {
      const patientSessionData: CreatePatientsSessionDto = { patientId: patient, sessionId: sessionId };
      await this.patientsSessionService.create({ data: patientSessionData });
    });

    const updateSession = await this.sessions.update({
      where: { id: sessionId },
      data: { ...sessionData, sessionDate: new Date(sessionData.sessionDate) },      
    });
    return updateSession;
  }

  public async deleteSession(sessionId: number): Promise<Session> {
    if (isEmpty(sessionId)) throw new HttpException(400, "Id da sessão não foi informado");

    const findSession: Session = await this.sessions.findUnique({ where: { id: sessionId } });
    if (!findSession) throw new HttpException(409, "Sessão inexistente");

    const deleteSessionData = await this.sessions.delete({ where: { id: sessionId } });
    return deleteSessionData;
  }
}

export default SessionService;
