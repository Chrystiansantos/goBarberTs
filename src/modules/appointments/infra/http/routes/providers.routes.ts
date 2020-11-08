import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providerController = new ProvidersController();

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.index);

export default providersRouter;
