import { PrismaClient, Patient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreatePatientDto } from '@/dtos/patients.dto';

class PatientService {
  public patients = new PrismaClient().patient;
  public professionals = new PrismaClient().professional;
  
  public async create(patientData: CreatePatientDto): Promise<Patient> {
    if (isEmpty(patientData)) throw new HttpException(400, 'Nenhum dado foi informado');

    const findPatient = await this.patients.findUnique({ where: { cpf: patientData.cpf } });
    if (findPatient) throw new HttpException(409, `O cpf ${patientData.cpf} já está cadastrado`);

    const findProfessional = await this.professionals.findUnique({ where: { id: patientData.professionalId } });
    if (!findProfessional) throw new HttpException(409, `Profissional ${patientData.professionalId} inexistente`);

    const createPatientlData: Promise<Patient> = this.patients.create({ data: { ...patientData, birthDate: 
      new Date(patientData.birthDate) } });

    return createPatientlData;
  }

  public async findAllPatients(professionalId: number): Promise<Patient[]> {
    if (isEmpty(professionalId)) throw new HttpException(400, 'Id do profissional não foi informado');

    const allPatients: Patient[] = await this.patients.findMany({ where: { professionalId } });
    return allPatients;
  }

  public async findPatientById(patientId: number): Promise<Patient> {
    if (isEmpty(patientId)) throw new HttpException(400, 'Id do paciente não foi informado');

    const findPatient: Patient = await this.patients.findUnique({ where: { id: patientId } });
    if (!findPatient) throw new HttpException(409, "Paciente inexistente");

    return findPatient;
  }

  public async updatePatient(patientId: number, patientData: CreatePatientDto): Promise<Patient> {
    if (isEmpty(patientData)) throw new HttpException(400, 'Nenhum dado foi informado');

    let findPatient: Patient = await this.patients.findUnique({ where: { id: patientId } });
    if (!findPatient) throw new HttpException(409, "Paciente inexistente");

    findPatient = await this.patients.findFirst({ where: { id: {not: patientId}, cpf: patientData.cpf } });
    if (findPatient) throw new HttpException(409, `O cpf ${patientData.cpf} já está cadastrado`);

    const updatePatient = await this.patients.update({
      where: { id: patientId },
      data: { ...patientData, birthDate: new Date(patientData.birthDate) },
    });
    return updatePatient;
  }

  public async deletePatient(patientId: number): Promise<Patient> {
    if (isEmpty(patientId)) throw new HttpException(400, "Id do paciente não foi informado");

    const findPatient: Patient = await this.patients.findUnique({ where: { id: patientId } });
    if (!findPatient) throw new HttpException(409, "Paciente inexistente");

    const deletePatientData = await this.patients.delete({ where: { id: patientId } });
    return deletePatientData;
  }
}

export default PatientService;
