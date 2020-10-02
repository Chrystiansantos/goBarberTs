import { Router, Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepositories from '@modules/users/infra/typeorm/repositories/UsersRepositories';

const sessionRouter = Router();

sessionRouter.post('/', async (req: Request, res: Response) => {
  const usersRepositories = new UsersRepositories();
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService(usersRepositories);
  const { user, token } = await authenticateUser.execute({ email, password });

  delete user.password;

  return res.json({ user, token });
});

export default sessionRouter;
