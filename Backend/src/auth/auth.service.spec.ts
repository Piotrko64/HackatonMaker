import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should throw BadRequestException if email is already in use', async () => {
      jest.spyOn(service['prisma'].user, 'findUnique').mockResolvedValue({
        id: 1,
        email: 'existing@example.com',
        password: 'hashedPassword',
      });
      const createUserDto = {
        email: 'existing@example.com',
        password: 'password123',
      };

      await expect(service.signup(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should call userService.addUser with correct data', async () => {
      jest.spyOn(service['prisma'].user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(userService, 'addUser').mockResolvedValue({
        id: 1,
        email: 'new@example.com',
        password: 'hashedPassword',
      });
      const createUserDto = {
        email: 'new@example.com',
        password: 'password123',
      };

      await service.signup(createUserDto);

      expect(userService.addUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('signin', () => {
    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(service['prisma'].user, 'findUnique').mockResolvedValue(null);

      await expect(
        service.signin('nonexistent@example.com', 'password123'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if password is incorrect', async () => {
      jest.spyOn(service['prisma'].user, 'findUnique').mockResolvedValue({
        id: 1,
        email: 'existing@example.com',
        password: 'salt.hashedPassword',
      });

      await expect(
        service.signin('existing@example.com', 'incorrectPassword'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
