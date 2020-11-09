import FakeAppointmentsRepository from '../../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailability from '../ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailability;
describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailability(
      fakeAppointmentsRepository,
    );
  });
  it('it should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 10, 7, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 10, 7, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 7,
      month: 11,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
