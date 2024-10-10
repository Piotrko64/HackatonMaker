import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUser() {
    return await this.prisma.user.findMany({
      select: {
        email: true,
      },
    });
  }

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  addUser(body: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
  }
}
