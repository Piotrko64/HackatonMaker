import { Exclude } from 'class-transformer';

export class UserDto {
  id: number;

  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
