import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { exampleEmail } from 'src/swagger-data/examples/exampleEmail';

export class CreateContactDto {
  @ApiProperty(exampleEmail)
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '123123123' })
  @IsPhoneNumber()
  phone: string;
}
