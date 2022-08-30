import { PrismaClient, Professional } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateProfessionalDto, UpdateProfessionalDto } from '@/dtos/professionals.dto';

class ProfessionalService {
  public professionals = new PrismaClient().professional;

  public async create(professionalData: CreateProfessionalDto): Promise<Professional> {
    if (isEmpty(professionalData)) throw new HttpException(400, 'professionalData is empty');

    const createProfessionalData: Promise<Professional> = this.professionals.create({
      data: { ...professionalData },
    });

    return createProfessionalData;
  }

  public async findAllProfessionals(): Promise<Professional[]> {
    const allProfessionals: Professional[] = await this.professionals.findMany();
    return allProfessionals;
  }

  public async findProfessionalById(professionalId: number): Promise<Professional> {
    if (isEmpty(professionalId)) throw new HttpException(400, 'professionalId is empty');

    const findProfessional: Professional = await this.professionals.findUnique({ where: { id: professionalId } });
    if (!findProfessional) throw new HttpException(409, "Professional doesn't exist");

    return findProfessional;
  }

  public async updateProfessional(
    professionalId: number,
    professionalData: UpdateProfessionalDto,
  ): Promise<Professional> {
    if (isEmpty(professionalData)) throw new HttpException(400, 'professionalData is empty');

    let findProfessional: Professional = await this.professionals.findUnique({ where: { id: professionalId } });
    if (!findProfessional) throw new HttpException(409, "Professional doesn't exist");

    findProfessional = await this.professionals.findUnique({ where: { crp: professionalData.crp } });
    if (findProfessional) throw new HttpException(409, `This crp ${professionalData.crp} already exists`);

    const updateProfessional = await this.professionals.update({
      where: { id: professionalId },
      data: { ...professionalData },
    });
    return updateProfessional;
  }

  public async deleteProfessional(professionalId: number): Promise<Professional> {
    if (isEmpty(professionalId)) throw new HttpException(400, "Professional doesn't exist Id");

    const findProfessional: Professional = await this.professionals.findUnique({ where: { id: professionalId } });
    if (!findProfessional) throw new HttpException(409, "Professional doesn't exist");

    const deleteProfessionalData = await this.professionals.delete({ where: { id: professionalId } });
    return deleteProfessionalData;
  }
}

export default ProfessionalService;
