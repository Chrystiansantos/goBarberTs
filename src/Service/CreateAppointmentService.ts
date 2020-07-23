import { startOfHour } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider: string;
  date: Date;
}
class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    // Irei passar o AppointmentRepository e a partir dai terei acesso a todos os metodos
    const appointmentsRepository = getCustomRepository(AppointmentRepository);
    const appointmentDate = startOfHour(date);

    const findApointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findApointmentInSameDate)
      throw Error('This appointment is alread booked');

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
