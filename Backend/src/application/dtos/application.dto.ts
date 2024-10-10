export class ApplicationDto {
  id: number;
  team_name: string;
  desc: string;
  contacts: string;
  fileIds: string[];

  constructor(partial: Partial<ApplicationDto>) {
    Object.assign(this, partial);
  }
}
