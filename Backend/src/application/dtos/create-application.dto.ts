import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ example: 'team' })
  @IsNotEmpty()
  @IsString()
  team_name: string;

  @ApiProperty({ example: 'funny describe' })
  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: { phone: '123456789', email: 'qwe@qwe.pl', name: 'name' },
  })
  contacts: {
    email: string;
    phone: string;
    name: string;
  };

  fileIds: string[];
}
