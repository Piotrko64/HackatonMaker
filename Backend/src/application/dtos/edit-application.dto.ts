import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditApplicationDto {
  @ApiProperty({ example: 'name' })
  @IsOptional()
  @IsString()
  team_name: string;

  @ApiProperty({ example: 'desc' })
  @IsOptional()
  @IsString()
  desc: string;

  @ApiProperty({
    example: [{ email: 'email@email.pl', phone: '123456789', name: 'Albert' }],
  })
  @IsOptional()
  contacts: {
    email: string;
    phone: string;
    name: string;
  };
}
