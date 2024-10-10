import { Test, TestingModule } from '@nestjs/testing';
import { CurrentUserMiddleware } from './current-user.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';

describe('CurrentUserMiddleware', () => {
  let middleware: CurrentUserMiddleware;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrentUserMiddleware,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    middleware = module.get<CurrentUserMiddleware>(CurrentUserMiddleware);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should assign user to request if session contains email', async () => {
    const email = 'test@example.com';
    const req = { session: { email } };

    const mockUser = { id: 1, email: 'test@example.com', password: 'pass' };
    jest
      .spyOn(prismaService.user, 'findUnique')
      .mockResolvedValueOnce(mockUser);

    const next = jest.fn();

    await middleware.use(req, {} as Response, next);

    expect(req.session.email).toBe(mockUser.email);

    expect(next).toHaveBeenCalled();
  });

  it('should not assign user to request if session does not contain email', async () => {
    const req = { session: {} };

    const next = jest.fn();

    await middleware.use(req, {} as Response, next);

    expect(req.session['email']).toBeUndefined();

    expect(next).toHaveBeenCalled();
  });
});
