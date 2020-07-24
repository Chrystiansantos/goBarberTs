import { Router } from 'express';
import apointmentsRouter from './appointments.routes';
import userRouter from './users.routes';

const routes = Router();

routes.use('/appointments', apointmentsRouter);
routes.use('/user', userRouter);
export default routes;
