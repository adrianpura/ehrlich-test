import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsersService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('it should create a user', () => {
    expect(
      controller.createUser({
        first_name: 'Adrian',
        last_name: 'test',
        address: 'pasig',
        post_code: 1234,
        contact_number: 91239393694,
        email: 'test@gmail.com',
        username: 'test',
        password: 'changeme',
      }),
    ).toEqual({
      id: expect.any(Number),
      first_name: 'Adrian',
      last_name: 'test',
      address: 'pasig',
      post_code: 1234,
      contact_number: 91239393694,
      email: 'test@gmail.com',
      username: 'test',
      password: 'changeme',
    });
  });
});
