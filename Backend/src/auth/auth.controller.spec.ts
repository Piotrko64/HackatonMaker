import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { SignInDto } from './dtos/singin.dto';
import { UserDto } from '../user/dtos/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, UserService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should return a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const createdUser: UserDto = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      jest.spyOn(authService, 'signup').mockResolvedValue(createdUser);

      const result = await controller.signup(createUserDto);

      expect(result).toEqual(new UserDto(createdUser));
    });
  });

  describe('signin', () => {
    it('should return a user and set session', async () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const signedInUser: UserDto = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      jest.spyOn(authService, 'signin').mockResolvedValue(signedInUser);

      const session = {};
      await controller.signin(signInDto, session);

      expect(signedInUser.email).toEqual('test@example.com');
    });
  });

  describe('whoami', () => {
    it('should return current user', () => {
      const currentUser: UserDto = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      const result = controller.whoami(currentUser);

      expect(result).toEqual(new UserDto(currentUser));
    });
  });

  describe('signout', () => {
    it('should clear session', () => {
      const session = { email: 'test@example.com' };

      controller.signout(session);

      expect(session.email).toBeNull();
    });
  });
});
