import { Router } from 'express';
import SessionsControler from '../controllers/SessionsController';

const sessionsControler = new SessionsControler();
const sessionRouter = Router();

sessionRouter.post('/', sessionsControler.create);

export default sessionRouter;
