import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UserModule, AuthModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have AuthController', () => {
    const controller = module.get(AuthController);
    expect(controller).toBeDefined();
  });

  it('should have AuthService', () => {
    const service = module.get(AuthService);
    expect(service).toBeDefined();
  });

  it('should have PrismaService', () => {
    const prismaService = module.get(PrismaService);
    expect(prismaService).toBeDefined();
  });

  it('should export AuthService', () => {
    const exportedAuthService = module.get<AuthService>(AuthService);
    expect(exportedAuthService).toBeDefined();
  });
});
