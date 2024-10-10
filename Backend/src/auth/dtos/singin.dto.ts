import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { exampleEmail } from 'src/swagger-data/examples/exampleEmail';
import { examplePassword } from 'src/swagger-data/examples/examplePassword';

export class SignInDto {
  @ApiProperty(exampleEmail)
  @IsEmail()
  email: string;

  @ApiProperty(examplePassword)
  @IsString()
  password: string;
}
