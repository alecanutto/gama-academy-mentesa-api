import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import SessionsController from '@/controllers/sessions.controller';
import { CreateSessionDto } from '@/dtos/sessions.dto';

class SessionRoute implements Routes {
  public path = '/sessions';
  public router = Router();
  public sessionsController = new SessionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.sessionsController.getSessions);
    this.router.get(`${this.path}/:id(\\d+)`, this.sessionsController.getSessionById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateSessionDto, 'body'),
      this.sessionsController.createSession,
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(CreateSessionDto, 'body', true),
      this.sessionsController.updateSession,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, this.sessionsController.deleteSession);
  }
}

export default SessionRoute;
