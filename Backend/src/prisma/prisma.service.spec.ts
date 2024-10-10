import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should connect to the database on module initialization', async () => {
    const connectSpy = jest
      .spyOn(prismaService, '$connect')
      .mockImplementation();

    await prismaService.onModuleInit();

    expect(connectSpy).toHaveBeenCalledTimes(1);
  });
});
