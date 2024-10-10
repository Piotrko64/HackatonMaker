import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ContactService', () => {
  let service: ContactService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            contact: {
              create: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ContactService>(ContactService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('deleteContacts', () => {
    it('should delete contacts by applicationId', async () => {
      const applicationId = 1;

      await service.deleteContacts(applicationId);

      expect(prismaService.contact.deleteMany).toHaveBeenCalledWith({
        where: {
          applicationId,
        },
      });
    });
  });
});
