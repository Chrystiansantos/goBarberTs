import { Router, Request, Response } from 'express';
import AuthenticateUserService from '../Service/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();
    const { user } = await authenticateUser.execute({ email, password });

    delete user.password;

    return res.json({ user });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

export default sessionRouter;
