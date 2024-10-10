import { ApplicationDto } from './dtos/application.dto';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dtos/create-application.dto';
import { EditApplicationDto } from './dtos/edit-application.dto';
import { PrismaService } from './../prisma/prisma.service';
import { FilesService } from './../files/files.service';
import { ContactService } from './../contact/contact.service';

@Injectable()
export class ApplicationService {
  constructor(
    private prisma: PrismaService,
    private fileService: FilesService,
    private contactsService: ContactService,
  ) {}

  async createApplication(body: CreateApplicationDto, file) {
    const existingApplication = await this.prisma.application.findUnique({
      where: {
        team_name: body.team_name,
      },
    });

    if (existingApplication) {
      return new ConflictException(
        'Application with this team_name already exist!',
      );
    }

    const application = await this.prisma.application.create({
      data: {
        team_name: body.team_name,
        desc: body.desc,
      },
    });

    await this.contactsService.createContact(body.contacts, application.id);

    await this.fileService.uploadFile(file, application.id);

    return new ApplicationDto(application);
  }

  async getAllApplications() {
    const applications = await this.prisma.application.findMany({
      select: {
        team_name: true,
        contacts: true,
        id: true,
        desc: true,
        file_ids: true,
      },
    });

    return applications;
  }

  async editApplication(id: number, body: EditApplicationDto) {
    try {
      const { contacts, ...others } = body;

      if (contacts) {
        await this.contactsService.deleteContacts(id);
        await this.contactsService.createContact(body.contacts, id);
      }

      return await this.prisma.application.update({
        where: {
          id: +id,
        },
        data: {
          ...others,
        },
      });
    } catch (err) {
      Logger.log(err);
      return new NotFoundException('This application does not exist');
    }
  }
  async deleteApplication(id: number) {
    try {
      await this.prisma.application.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      return new NotFoundException('Application does not exist');
    }
  }
}
