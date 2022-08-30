import { CreatePatientsSessionDto } from '@/dtos/patientsSession.dto';
import { CreateSessionDto } from '@/dtos/sessions.dto';
import PatientsSessionService from '@/services/patientsSession.service';
import SessionService from '@/services/sessions.service';
import { Session } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

class SessionsController {
  public sessionService = new SessionService();
  public patientsSessionService = new PatientsSessionService();

  public getSessions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const professionalId = Number(req.query.id);
      const findAllSessionData: Session[] = await this.sessionService.findAllSession(professionalId);

      res.status(200).json({ data: findAllSessionData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSessionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sessionId = Number(req.params.id);
      const findOneSessionData: Session = await this.sessionService.findSessionById(sessionId);

      res.status(200).json({ data: findOneSessionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sessionData: CreateSessionDto = req.body;
      const createSessionData: Session = await this.sessionService.create(sessionData);

      sessionData.patients.forEach(async patient => {
        const patientSessionData: CreatePatientsSessionDto = { patientId: patient.id, sessionId: createSessionData.id };
        await this.patientsSessionService.create(patientSessionData);
      });

      res.status(200).json({ data: createSessionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sessionId = Number(req.params.id);
      const sessionData: CreateSessionDto = req.body;
      const updateSessionData: Session = await this.sessionService.updateSession(sessionId, sessionData);

      res.status(200).json({ data: updateSessionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sessionId = Number(req.params.id);
      const deleteSessionData: Session = await this.sessionService.deleteSession(sessionId);

      res.status(200).json({ data: deleteSessionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SessionsController;
