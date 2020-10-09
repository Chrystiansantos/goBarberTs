import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
// describe cria como se  fosse uma categoria pra facilitar a vizualizaca dos resultados
// geralmente passo o nome do service sem o service
describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123',
    });
    // ira verificar se existe essa propriedade
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });
  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const appointmentDate = new Date();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123123',
    });
    // Dessa forma eu espero que a funcao rejeite um erro e esse erro seja
    // uma instance de AppError
    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
