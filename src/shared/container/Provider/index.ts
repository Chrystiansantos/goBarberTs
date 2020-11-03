import { container } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUsersRepositories';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';

import IUserTokensRepository from '@modules/users/repositories/ITokenUserRespository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
