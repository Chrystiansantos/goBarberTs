import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface UserDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: UserDTO): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserExist = await usersRepository.findOne({
      where: { email },
    });
    if (checkUserExist) throw new AppError('Email address already used', 400);

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashPassword,
    });
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
