import { Router, Request, Response } from 'express';
import multer from 'multer';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';

import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdatedUserAvatarService from '@modules/users/services/AuthenticateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (req: Request, res: Response) => {
  const usersRepository = new UsersRepository();
  const { name, email, password } = req.body;
  const createUser = new CreateUserService(usersRepository);
  const user = await createUser.execute({ name, email, password });
  delete user.password;
  return res.json(user);
});
// Path utililzo somente quando quero atualizar apenas um campo
userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req: Request, res: Response) => {
    const usersRepository = new UsersRepository();
    const updatedUserAvatar = new UpdatedUserAvatarService(usersRepository);
    const user = await updatedUserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });
    delete user.password;
    return res.json(user);
  },
);

export default userRouter;
