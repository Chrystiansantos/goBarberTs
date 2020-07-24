import { Router, Request, Response } from 'express';
import CreateUserService from '../Service/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    delete user.password;
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default userRouter;
