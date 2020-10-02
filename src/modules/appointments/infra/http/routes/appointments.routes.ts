import { Router, Response, Request } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
// Rota, se responsaviliza apenas por Receber uma requisicao,
//  Chamar um arquivo pra tratar deolver uam resposta
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (req: Request, res: Response) => {
  const { provider_id, date } = req.body;
  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });
  return res.json(appointment);
});

// appointmentsRouter.get('/', async (req: Request, res: Response) => {
//   const appointments = await appointmentsRepository.find();
//   return res.json(appointments);
// });

export default appointmentsRouter;
