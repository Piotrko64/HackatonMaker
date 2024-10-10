import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsStrongPassword,
  IsNotEmpty,
} from 'class-validator';
import { exampleEmail } from 'src/swagger-data/examples/exampleEmail';
import { examplePassword } from 'src/swagger-data/examples/examplePassword';

export class CreateUserDto {
  @ApiProperty(exampleEmail)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty(examplePassword)
  @IsNotEmpty()
  @IsStrongPassword({
    minLowercase: 1,
    minSymbols: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  @MinLength(8)
  password: string;
}
