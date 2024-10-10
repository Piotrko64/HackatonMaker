import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { PrismaService } from 'src/prisma/prisma.service';

const _scrypt = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async signup(data: CreateUserDto) {
    const { email, password } = data;

    const users = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (users)
      throw new BadRequestException('This email adress is already in use');

    const salt = randomBytes(32).toString('hex');
    const hash = (await _scrypt(password, salt, 32)) as Buffer;

    const result = `${salt}.${hash.toString('hex')}`;

    data.password = result;

    const user = this.userService.addUser(data);

    return user;
  }
  async signin(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User Not found');
    }
    const [salt, savedPassword] = user.password.split('.');

    const hashedPassword = (await _scrypt(password, salt, 32)) as Buffer;

    if (savedPassword === hashedPassword.toString('hex')) return user;
    else throw new BadRequestException('Invalid username or password');
  }
}
