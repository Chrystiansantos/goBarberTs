import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    // Irei passar o AppointmentRepository e a partir dai terei acesso a todos os metodos
    const appointmentDate = startOfHour(date);

    const findApointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findApointmentInSameDate)
      throw new AppError('This appointment is alread booked', 400);

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
