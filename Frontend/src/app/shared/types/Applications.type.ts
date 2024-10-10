export type Application = {
  id: number;
  team_name: string;
  desc: string;
  contacts: { name: string; phone: string; email: string }[];
  file_ids: [
    {
      id: number;
      name: string;
      upload_date: Date;
      applicationId: number;
    }
  ];
};
