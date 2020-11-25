import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const providerAppointmentsController = new ProviderAppointmentsController();
const appointmentsController = new AppointmentsController();
const appointmentsRouter = Router();
// Rota, se responsaviliza apenas por Receber uma requisicao,
//  Chamar um arquivo pra tratar deolver uam resposta
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
