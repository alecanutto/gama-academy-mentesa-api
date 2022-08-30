import { PrismaClient, Patient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreatePatientDto } from '@/dtos/patients.dto';

class PatientService {
  public patients = new PrismaClient().patient;

  public async create(patientData: CreatePatientDto): Promise<Patient> {
    if (isEmpty(patientData)) throw new HttpException(400, 'patientData is empty');

    const findPatient = await this.patients.findUnique({ where: { cpf: patientData.cpf } });
    if (findPatient) throw new HttpException(409, `This cpf ${patientData.cpf} already exists`);

    const createPatientlData: Promise<Patient> = this.patients.create({ data: { ...patientData } });

    return createPatientlData;
  }

  public async findAllPatients(professionalId: number): Promise<Patient[]> {
    if (isEmpty(professionalId)) throw new HttpException(400, 'professionalId is empty');

    const allPatients: Patient[] = await this.patients.findMany({ where: { professionalId } });
    return allPatients;
  }

  public async findPatientById(patientId: number): Promise<Patient> {
    if (isEmpty(patientId)) throw new HttpException(400, 'patientId is empty');

    const findPatient: Patient = await this.patients.findUnique({ where: { id: patientId } });
    if (!findPatient) throw new HttpException(409, "Patient doesn't exist");

    return findPatient;
  }

  public async updatePatient(patientId: number, patientData: CreatePatientDto): Promise<Patient> {
    if (isEmpty(patientData)) throw new HttpException(400, 'patientData is empty');

    let findPatient: Patient = await this.patients.findUnique({ where: { id: patientId } });
    if (!findPatient) throw new HttpException(409, "Patient doesn't exist");

    findPatient = await this.patients.findUnique({ where: { cpf: patientData.cpf } });
    if (findPatient) throw new HttpException(409, `This cpf ${patientData.cpf} already exists`);

    const updatePatient = await this.patients.update({
      where: { id: patientId },
      data: { ...patientData },
    });
    return updatePatient;
  }

  public async deletePatient(patientId: number): Promise<Patient> {
    if (isEmpty(patientId)) throw new HttpException(400, "Patient doesn't exist Id");

    const findPatient: Patient = await this.patients.findUnique({ where: { id: patientId } });
    if (!findPatient) throw new HttpException(409, "Patient doesn't exist");

    const deletePatientData = await this.patients.delete({ where: { id: patientId } });
    return deletePatientData;
  }
}

export default PatientService;
