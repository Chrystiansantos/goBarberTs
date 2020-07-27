import { Router, Request, Response } from 'express';
import AuthenticateUserService from '../Service/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService();
  const { user, token } = await authenticateUser.execute({ email, password });

  delete user.password;

  return res.json({ user, token });
});

export default sessionRouter;
