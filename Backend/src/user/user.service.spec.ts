import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    userService = new UserService(prismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return all users with only email field', async () => {
    const mockUsers = [
      { email: 'test1@example.com', id: 1, password: '123' },
      ,
    ];
    jest.spyOn(prismaService.user, 'findMany').mockResolvedValueOnce(mockUsers);

    const result = await userService.getAllUser();
    expect(result).toEqual(mockUsers.map((user) => ({ ...user })));
  });

  it('should return the user with the given id', async () => {
    const mockUser = { id: 1, email: 'test@example.com', password: '123' };
    jest
      .spyOn(prismaService.user, 'findUnique')
      .mockResolvedValueOnce(mockUser);

    const result = await userService.getUser(mockUser.id);
    expect(result).toEqual(mockUser);
  });

  it('should throw NotFoundException if user with given id does not exist', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

    await expect(userService.getUser(1)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should add a new user', async () => {
    const createUserDto = { email: 'test@example.com', password: 'password' };
    const mockCreatedUser = {
      id: 1,
      email: createUserDto.email,
      password: 'password',
    };
    jest
      .spyOn(prismaService.user, 'create')
      .mockResolvedValueOnce(mockCreatedUser);

    const result = await userService.addUser(createUserDto);
    expect(result).toEqual(mockCreatedUser);
  });
});
