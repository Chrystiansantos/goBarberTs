import { Router, Response, Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '../Service/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentRepository';

const appointmentsRouter = Router();

// Rota, se responsaviliza apenas por Receber uma requisicao,
//  Chamar um arquivo pra tratar deolver uam resposta

appointmentsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    });
    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

appointmentsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appointmentsRepository.find();
    return res.json(appointments);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default appointmentsRouter;
