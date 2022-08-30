import { PrismaClient, Session } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateSessionDto } from '@/dtos/sessions.dto';

class SessionService {
  public sessions = new PrismaClient().session;

  public async create(sessionData: CreateSessionDto): Promise<Session> {
    if (isEmpty(sessionData)) throw new HttpException(400, 'sessionData is empty');

    const createSessionData: Promise<Session> = this.sessions.create({ data: { ...sessionData } });
    return createSessionData;
  }

  public async findAllSession(professionalId: number): Promise<Session[]> {
    if (isEmpty(professionalId)) throw new HttpException(400, 'professionalId is empty');

    const allSessions: Session[] = await this.sessions.findMany({ where: { professionalId } });
    return allSessions;
  }

  public async findSessionById(sessionId: number): Promise<Session> {
    if (isEmpty(sessionId)) throw new HttpException(400, 'sessionId is empty');

    const findSession: Session = await this.sessions.findUnique({ where: { id: sessionId } });
    if (!findSession) throw new HttpException(409, "Session doesn't exist");

    return findSession;
  }

  public async updateSession(sessionId: number, sessionData: CreateSessionDto): Promise<Session> {
    if (isEmpty(sessionData)) throw new HttpException(400, 'sessionData is empty');

    const findSession: Session = await this.sessions.findUnique({ where: { id: sessionId } });
    if (!findSession) throw new HttpException(409, "Session doesn't exist");

    const updateSession = await this.sessions.update({
      where: { id: sessionId },
      data: { ...sessionData },
    });
    return updateSession;
  }

  public async deleteSession(sessionId: number): Promise<Session> {
    if (isEmpty(sessionId)) throw new HttpException(400, "Session doesn't exist Id");

    const findSession: Session = await this.sessions.findUnique({ where: { id: sessionId } });
    if (!findSession) throw new HttpException(409, "Session doesn't exist");

    const deleteSessionData = await this.sessions.delete({ where: { id: sessionId } });
    return deleteSessionData;
  }
}

export default SessionService;
