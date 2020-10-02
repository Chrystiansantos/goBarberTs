import { Router, Response, Request } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsController = new AppointmentsController();
const appointmentsRouter = Router();
// Rota, se responsaviliza apenas por Receber uma requisicao,
//  Chamar um arquivo pra tratar deolver uam resposta
appointmentsRouter.use(ensureAuthenticated, appointmentsController.create);

appointmentsRouter.post('/', appointmentsController.create);

// appointmentsRouter.get('/', async (req: Request, res: Response) => {
//   const appointments = await appointmentsRepository.find();
//   return res.json(appointments);
// });

export default appointmentsRouter;
