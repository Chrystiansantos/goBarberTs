import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Users from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdatedUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<Users> {
    const userRepository = getRepository(Users);
    console.log(user_id);
    const user = await userRepository.findOne(user_id);
    if (!user) throw new Error('Only authenticated can change avatar');

    if (user.avatar) {
      // Aqui vou verificar se existe este arquivo no storage
      const userAvatarFilePath = path.join(uploadConfig.derectory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        // Aqui eu estou deletando o arquivo
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;
    await userRepository.save(user);
    return user;
  }
}

export default UpdatedUserAvatarService;
