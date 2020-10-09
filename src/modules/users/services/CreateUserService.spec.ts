import FakeUserRepositories from '@modules/users/repositories/fakes/FakeUserRepositories';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

describe('Createuser', () => {
  it('Should be able to create a new User', async () => {
    const fakeUserRepository = new FakeUserRepositories();
    const createUserService = new CreateUserService(fakeUserRepository);
    const user = await createUserService.execute({
      name: 'Chrystian',
      email: 'chrystian@gmail.com',
      password: 'olaMundo',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepositories = new FakeUserRepositories();
    const createUserService = new CreateUserService(fakeUserRepositories);

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
