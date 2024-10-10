import { UserDto } from './user.dto';

describe('UserDto', () => {
  it('should create a new UserDto object', () => {
    const partialData = {
      id: 1,
      email: 'example@example.pl',
      password: '123!@#QWEqwe',
    };

    const userDto = new UserDto(partialData);

    expect(userDto).toBeDefined();
    expect(userDto.id).toBe(partialData.id);
    expect(userDto.email).toBe(partialData.email);
    expect(userDto.password).toBe(partialData.password);
  });

  it('should create a new UserDto object with default values', () => {
    const partialData = {};

    const userDto = new UserDto(partialData);

    expect(userDto).toBeDefined();
    expect(userDto.id).toBeUndefined();
    expect(userDto.email).toBeUndefined();
    expect(userDto.password).toBeUndefined();
  });
});
