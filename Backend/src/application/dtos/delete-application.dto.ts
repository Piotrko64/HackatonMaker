import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteApplicationDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
}
