import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import PatientsController from '@/controllers/patients.controller';
import { CreatePatientDto } from '@/dtos/patients.dto';
import authMiddleware from '@/middlewares/auth.middleware';

class PatientRoute implements Routes {
  public path = '/patients';
  public router = Router();
  public patientsController = new PatientsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.patientsController.getPatients);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.patientsController.getPatientById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreatePatientDto, 'body'),
      this.patientsController.createPatient,
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      validationMiddleware(CreatePatientDto, 'body', true),
      this.patientsController.updatePatient,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.patientsController.deletePatient);
  }
}

export default PatientRoute;
