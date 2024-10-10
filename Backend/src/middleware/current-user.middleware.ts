import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/user/dtos/user.dto';

declare module 'express' {
  export interface Request {
    user: UserDto;
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: any, _res: Response, next: NextFunction) {
    const email = req.session.email || null;

    if (email) {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      req.user = user;
    }
    next();
  }
}
