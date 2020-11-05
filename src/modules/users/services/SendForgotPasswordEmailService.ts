import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUsersRepositories';
import IMailProvider from '@shared/container/Provider/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '@modules/users/repositories/ITokenUserRespository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) throw new AppError('User does not exists');

    const { token } = await this.userTokenRepository.generate(userExists.id);

    await this.mailProvider.sendMail({
      to: {
        name: userExists.name,
        email: userExists.email,
      },
      subject: '[Gobarber] Recuperação de senha',
      templateData: {
        template: 'Olá, {{name}}, token:{{token}}',
        variables: {
          name: userExists.name,
          token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
