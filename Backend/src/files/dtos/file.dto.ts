export class FileDto {
  id: number;
  name: string;
  date: Date;
  applicationId: number;

  constructor(partial: Partial<FileDto>) {
    Object.assign(this, partial);
  }
}
