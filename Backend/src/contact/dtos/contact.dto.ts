import { Exclude } from 'class-transformer';

export class ContactDto {
  id: number;
  name: string;
  email: string;
  phone: string;

  @Exclude()
  applicationId: number;

  constructor(partial: Partial<ContactDto>) {
    Object.assign(this, partial);
  }
}
