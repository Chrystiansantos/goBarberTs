import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Users from '../models/User';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: Users;
  token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({ where: { email } });
    if (!user) throw new Error('Incorrect email/password combination');
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched)
      throw new Error('Incorrect email/password combination');

    const token = sign({}, 'd94522238af6fdc887e722517a0fd63e', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
