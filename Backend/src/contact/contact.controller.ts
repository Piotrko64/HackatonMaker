import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateContactDto } from './dtos/create-contact.dto';
import { ContactService } from './contact.service';
import { ContactEndpointsDataSwagger } from 'src/swagger-data/ContactEndpointsDataSwagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('contact')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('/:applicationId')
  @ApiOperation(ContactEndpointsDataSwagger.AddContact.ApiOperation)
  @ApiResponse(ContactEndpointsDataSwagger.AddContact.ApiResponse)
  async createContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateContactDto[],
  ) {
    return this.contactService.createContact(body, id);
  }
}
