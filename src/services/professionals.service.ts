import { PrismaClient, Professional } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateProfessionalDto, UpdateProfessionalDto } from '@/dtos/professionals.dto';

class ProfessionalService {
  public professionals = new PrismaClient().professional;

  public async create(professionalData: CreateProfessionalDto): Promise<Professional> {
    if (isEmpty(professionalData)) throw new HttpException(400, 'Nenhum dado foi informado');

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
    if (isEmpty(professionalId)) throw new HttpException(400, 'Id do profissional não foi informado');

    const findProfessional: Professional = await this.professionals.findUnique({ where: { id: professionalId } });
    if (!findProfessional) throw new HttpException(409, 'Profissional inexistente');

    return findProfessional;
  }

  public async findProfessionalByUserId(userId: number): Promise<Professional> {
    if (isEmpty(userId)) throw new HttpException(400, 'Id do usuário não foi informado');

    const findProfessional: Professional = await this.professionals.findUnique({ where: { userId } });
    if (!findProfessional) throw new HttpException(409, 'Profissional inexistente');

    return findProfessional;
  }

  public async updateProfessional(
    professionalId: number,
    professionalData: UpdateProfessionalDto,
  ): Promise<Professional> {
    if (isEmpty(professionalData)) throw new HttpException(400, 'Nenhum dado foi informado');

    let findProfessional: Professional = await this.professionals.findUnique({ where: { id: professionalId } });
    if (!findProfessional) throw new HttpException(409, 'Profissional inexistente');

    findProfessional = await this.professionals.findFirst({
      where: { id: { not: professionalId }, crp: professionalData.crp },
    });
    if (findProfessional) throw new HttpException(409, `O crp ${professionalData.crp} já está cadastrado`);

    const updateProfessional = await this.professionals.update({
      where: { id: professionalId },
      data: { ...professionalData },
    });
    return updateProfessional;
  }

  public async deleteProfessional(professionalId: number): Promise<Professional> {
    if (isEmpty(professionalId)) throw new HttpException(400, 'Id do profissional não foi informado');

    const findProfessional: Professional = await this.professionals.findUnique({ where: { id: professionalId } });
    if (!findProfessional) throw new HttpException(409, 'Profissional inexistente');

    const deleteProfessionalData = await this.professionals.delete({ where: { id: professionalId } });
    return deleteProfessionalData;
  }
}

export default ProfessionalService;
