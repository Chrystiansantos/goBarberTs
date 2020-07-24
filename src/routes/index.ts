import { Router } from 'express';
import apointmentsRouter from './appointments.routes';
import userRouter from './users.routes';
import sessionRouter from './session.routes';

const routes = Router();

routes.use('/appointments', apointmentsRouter);
routes.use('/user', userRouter);
routes.use('/session', sessionRouter);
export default routes;
