import { Router } from 'express';
import apointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';

const routes = Router();

routes.use('/appointments', apointmentsRouter);
routes.use('/user', userRouter);
routes.use('/session', sessionRouter);
export default routes;
