import { startOfHour } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';
import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    // Irei passar o AppointmentRepository e a partir dai terei acesso a todos os metodos
    const appointmentsRepository = getCustomRepository(AppointmentRepository);
    const appointmentDate = startOfHour(date);

    const findApointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findApointmentInSameDate)
      throw new AppError('This appointment is alread booked', 400);

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
