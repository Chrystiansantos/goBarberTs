import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}
@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    day,
    month,
    year,
    provider_id,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );
    return appointments;
  }
}
