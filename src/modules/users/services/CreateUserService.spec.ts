import FakeUserRepositories from '@modules/users/repositories/fakes/FakeUserRepositories';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('Createuser', () => {
  it('Should be able to create a new User', async () => {
    const fakeUserRepository = new FakeUserRepositories();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Chrystian',
      email: 'chrystian@gmail.com',
      password: 'olaMundo',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepositories = new FakeUserRepositories();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepositories,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'Chrystian',
      email: 'chrystian@gmail.com',
      password: 'olaMundo',
    });

    expect(
      createUserService.execute({
        name: 'Chrystian',
        email: 'chrystian@gmail.com',
        password: 'olaMundo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
