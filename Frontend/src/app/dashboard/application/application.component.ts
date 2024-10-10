import { Component, Input } from '@angular/core';
import { Application } from 'src/app/shared/types/Applications.type';
import { DashboardService } from './../dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { AddApplicationModalComponent } from '../add-application-modal/add-application-modal.component';
import { FileServerUrl } from 'src/app/shared/constants/FileServerUrl';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent {
  @Input({ required: true }) application: Application;

  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardService
  ) {}

  protected deleteApplication() {
    this.dashboardService.deleteApplication(this.application);
  }

  protected get downloadUrl() {
    return FileServerUrl + this.fileName;
  }

  protected get fileName() {
    return this.application?.file_ids?.[0]?.name || '';
  }

  protected openDialog(formTitle: string, isEditMode: boolean): void {
    const dialogRef = this.dialog.open(AddApplicationModalComponent, {
      height: '800px',
      width: '800px',
      data: {
        formTitle,
        isEditMode,
        applicationData: this.application,
      },
    });
  }
}
