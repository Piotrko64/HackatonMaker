import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { PrismaService } from 'src/prisma/prisma.service';

jest.mock('aws-sdk', () => {
  const mockedS3 = {
    upload: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return {
    S3: jest.fn(() => mockedS3),
  };
});

describe('FilesService', () => {
  let service: FilesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService, PrismaService],
    }).compile();

    service = module.get<FilesService>(FilesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload file and create file record in database', async () => {
    const prismaCreateFileResponse = {
      id: 1,
      name: 'uploaded_file_key.txt',
      upload_date: new Date(),
      applicationId: 1,
    };

    jest
      .spyOn(prismaService.application, 'findUnique')
      .mockResolvedValue({ id: 4, team_name: 'a', desc: 'a' });

    jest
      .spyOn(service, 'createFile')
      .mockResolvedValue(prismaCreateFileResponse);

    expect(service.createFile).toBeTruthy();
  });
});
