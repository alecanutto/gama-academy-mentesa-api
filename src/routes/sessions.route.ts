import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import SessionsController from '@/controllers/sessions.controller';
import { CreateSessionDto } from '@/dtos/sessions.dto';
import authMiddleware from '@/middlewares/auth.middleware';

class SessionRoute implements Routes {
  public path = '/sessions';
  public router = Router();
  public sessionsController = new SessionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.sessionsController.getSessions);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.sessionsController.getSessionById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateSessionDto, 'body'),
      this.sessionsController.createSession,
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      validationMiddleware(CreateSessionDto, 'body', true),
      this.sessionsController.updateSession,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.sessionsController.deleteSession);
  }
}

export default SessionRoute;
