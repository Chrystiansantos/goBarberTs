import path from 'path';
import fs from 'fs';
import Users from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepositories';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}
@injectable()
class UpdatedUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<Users> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('Only authenticated can change avatar');

    if (user.avatar) {
      // Aqui vou verificar se existe este arquivo no storage
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        // Aqui eu estou deletando o arquivo
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;
    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdatedUserAvatarService;
