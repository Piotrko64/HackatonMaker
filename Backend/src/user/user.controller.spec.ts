import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    const mockUsers = [
      { id: 1, email: 'test1@example.com' },
      { id: 2, email: 'test2@example.com' },
    ];
    jest.spyOn(service, 'getAllUser').mockResolvedValueOnce(mockUsers);

    const result = await controller.getAllUser();
    expect(result).toEqual(mockUsers);
  });

  it('should return user by id', async () => {
    const mockUser = { id: 1, email: 'test@example.com', password: 'aaa' };
    jest.spyOn(service, 'getUser').mockResolvedValueOnce(mockUser);

    const result = await controller.getUserById(mockUser.id);
    expect(result).toBeInstanceOf(UserDto);
    expect(result.id).toEqual(mockUser.id);
    expect(result.email).toEqual(mockUser.email);
  });

  it('should add a new user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password',
    };
    const mockCreatedUser = {
      id: 1,
      password: 'password',
      email: createUserDto.email,
    };
    jest.spyOn(service, 'addUser').mockResolvedValueOnce(mockCreatedUser);

    const result = await controller.addUser(createUserDto);
    expect(result).toBeInstanceOf(UserDto);
    expect(result.id).toEqual(mockCreatedUser.id);
    expect(result.email).toEqual(mockCreatedUser.email);
  });
});
