import { NextFunction, Request, Response } from 'express';
import { Patient } from '@prisma/client';
import PatientService from '@/services/patients.service';
import { CreatePatientDto } from '@/dtos/patients.dto';

class PatientsController {
  public patientService = new PatientService();

  public getPatients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const professionalId = Number(req.query.professionalId);
      const findAllPatientsData: Patient[] = await this.patientService.findAllPatients(professionalId);

      res.status(200).json({ data: findAllPatientsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPatientById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const patientId = Number(req.params.id);
      const findOnePatientData: Patient = await this.patientService.findPatientById(patientId);

      res.status(200).json({ data: findOnePatientData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const patientData: CreatePatientDto = req.body;
      const updatePatientData: Patient = await this.patientService.create(patientData);

      res.status(200).json({ data: updatePatientData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const patientId = Number(req.params.id);
      const patientData: CreatePatientDto = req.body;
      const updatePatientData: Patient = await this.patientService.updatePatient(patientId, patientData);

      res.status(200).json({ data: updatePatientData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const patientId = Number(req.params.id);
      const deletePatientData: Patient = await this.patientService.deletePatient(patientId);

      res.status(200).json({ data: deletePatientData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PatientsController;
