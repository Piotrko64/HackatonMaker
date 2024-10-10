import { SerializeInterceptor } from './serialize.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { UserDto } from 'src/user/dtos/user.dto';

describe('SerializeInterceptor', () => {
  let interceptor: SerializeInterceptor = new SerializeInterceptor(UserDto);

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should return mapped data as instances of DTO', async () => {
    const context: ExecutionContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({}),
    } as any;
    const next: CallHandler = {
      handle: jest.fn().mockReturnValue(of({})),
    } as any;

    const mappedData = {};

    const result = await interceptor.intercept(context, next).toPromise();

    expect(result).toEqual(mappedData);
  });
});
