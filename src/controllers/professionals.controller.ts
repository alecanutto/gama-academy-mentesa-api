import { NextFunction, Request, Response } from 'express';
import { Professional } from '@prisma/client';
import professionalService from '@/services/professionals.service';
import { UpdateProfessionalDto } from '@/dtos/professionals.dto';

class ProfessionalsController {
  public professionalService = new professionalService();

  public getProfessionals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllProfessionalsData: Professional[] = await this.professionalService.findAllProfessionals();

      res.status(200).json({ data: findAllProfessionalsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProfessionalById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const professionalId = Number(req.params.id);
      const findOneProfessionalData: Professional = await this.professionalService.findProfessionalById(professionalId);

      res.status(200).json({ data: findOneProfessionalData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getProfessionalByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.query.userId);
      const findOneProfessionalData: Professional = await this.professionalService.findProfessionalByUserId(userId);

      res.status(200).json({ data: findOneProfessionalData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateProfessional = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const professionalId = Number(req.params.id);
      const professionalData: UpdateProfessionalDto = req.body;
      const updateProfessionalData: Professional = await this.professionalService.updateProfessional(
        professionalId,
        professionalData,
      );

      res.status(200).json({ data: updateProfessionalData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProfessional = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const professionalId = Number(req.params.id);
      const deleteProfessionalData: Professional = await this.professionalService.deleteProfessional(professionalId);

      res.status(200).json({ data: deleteProfessionalData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProfessionalsController;
