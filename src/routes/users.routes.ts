import { Router, Request, Response } from 'express';
import multer from 'multer';

import CreateUserService from '../Service/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';

const userRouter = Router();
const upload = multer(uploadConfig);

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
// Path utililzo somente quando quero atualizar apenas um campo
userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req: Request, res: Response) => {
    console.log(req.file);
    return res.json({ ok: true });
  },
);

export default userRouter;
