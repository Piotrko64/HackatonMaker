import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilesService } from 'src/files/files.service';
import { ContactService } from 'src/contact/contact.service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService, PrismaService, FilesService, ContactService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
