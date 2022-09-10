import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import ProfessionalsController from '@/controllers/professionals.controller';
import { UpdateProfessionalDto } from '@/dtos/professionals.dto';
import authMiddleware from '@/middlewares/auth.middleware';

class ProfessionalRoute implements Routes {
  public path = '/professionals';
  public router = Router();
  public professionalsController = new ProfessionalsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.professionalsController.getProfessionals);
    this.router.get(`${this.path}`, authMiddleware, this.professionalsController.getProfessionalByUserId);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.professionalsController.getProfessionalById);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      validationMiddleware(UpdateProfessionalDto, 'body', true),
      this.professionalsController.updateProfessional,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.professionalsController.deleteProfessional);
  }
}

export default ProfessionalRoute;
