import { IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  applicationId: string;
}
