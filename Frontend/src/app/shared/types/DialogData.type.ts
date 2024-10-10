import { Application } from './Applications.type';

export type DialogData = {
  formTitle: string;
  isEditMode: boolean;
  applicationData?: Application;
};
