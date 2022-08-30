import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import ProfessionalsController from '@/controllers/professionals.controller';
import { UpdateProfessionalDto } from '@/dtos/professionals.dto';

class ProfessionalRoute implements Routes {
  public path = '/professionals';
  public router = Router();
  public professionalsController = new ProfessionalsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.professionalsController.getProfessionals);
    this.router.get(`${this.path}/:id(\\d+)`, this.professionalsController.getProfessionalById);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(UpdateProfessionalDto, 'body', true),
      this.professionalsController.updateProfessional,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, this.professionalsController.deleteProfessional);
  }
}

export default ProfessionalRoute;
