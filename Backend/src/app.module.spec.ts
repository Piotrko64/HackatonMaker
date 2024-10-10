import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  it('should apply CurrentUserMiddleware for all routes', async () => {
    const middlewareConsumer = {
      apply: jest.fn().mockReturnThis(),
      forRoutes: jest.fn().mockReturnThis(),
    };

    await appModule.get(AppModule).configure(middlewareConsumer as any);

    expect(middlewareConsumer.apply).toHaveBeenCalledWith(
      CurrentUserMiddleware,
    );
    expect(middlewareConsumer.forRoutes).toHaveBeenCalledWith('*');
  });
});
