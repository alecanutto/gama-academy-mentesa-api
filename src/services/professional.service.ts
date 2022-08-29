import { PrismaClient, Professional } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateProfessionalDto } from '@/dtos/professionals.dto';

class ProfessionalService {
  public professionals = new PrismaClient().professional;

  public async create(professionalData: CreateProfessionalDto): Promise<Professional> {
    if (isEmpty(professionalData)) throw new HttpException(400, 'professionalData is empty');

    const createProfessionalData: Promise<Professional> = this.professionals.create({
      data: { ...professionalData },
    });

    return createProfessionalData;
  }
}

export default ProfessionalService;
