import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepositories';
import FakeHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import AuthenticateService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Chrystian Santos',
      email: 'chrystian@gmail.com',
      password: '123456',
    });
    const response = await authenticateUserService.execute({
      email: 'chrystian@gmail.com',
      password: '123456',
    });
    // VERIRICO SE OS OBJETOS SAO IGUAIS
    expect(response.user).toEqual(user);
    expect(response).toHaveProperty('token');
  });
});
