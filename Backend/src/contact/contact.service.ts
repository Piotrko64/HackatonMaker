import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContactDto } from './dtos/contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createContact(body: any, applicationId: number) {
    const data = Array.isArray(body) ? body : JSON.parse(body);
    const contacts = await this.prisma.$transaction(
      data.map((contact) =>
        this.prisma.contact.create({
          data: { ...contact, applicationId: +applicationId },
        }),
      ),
    );

    return contacts.map((contact) => new ContactDto(contact));
  }

  async deleteContacts(id: number) {
    return await this.prisma.contact.deleteMany({
      where: {
        applicationId: +id,
      },
    });
  }
}
