import { ApiOperationOptions } from '@nestjs/swagger';
import { CreateContactDto } from 'src/contact/dtos/create-contact.dto';

export const ContactEndpointsDataSwagger = {
  AddContact: {
    ApiOperation: {
      summary: 'Add new contact',
      requestBody: { content: { aaa: { example: { a: 'aaa' } } } },
    } as ApiOperationOptions,
    ApiResponse: {
      status: 200,
      schema: {
        type: [CreateContactDto],
        example: { phone: '123123123', email: 'mail@email.pl', name: 'Jakub' },
      },
    },
  },
};
