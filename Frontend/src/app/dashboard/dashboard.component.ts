import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddApplicationModalComponent } from './add-application-modal/add-application-modal.component';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  protected applications: Observable<any>;

  constructor(
    public dialog: MatDialog,
    public dashboardService: DashboardService,
    private authService: AuthService
  ) {}

  protected openDialog(formTitle: string, isEditMode: boolean): void {
    const dialogRef = this.dialog.open(AddApplicationModalComponent, {
      height: '800px',
      width: '600px',
      data: {
        formTitle,
        isEditMode,
      },
    });
  }

  ngOnInit() {
    this.dashboardService
      .downloadApplications()
      .subscribe((applications) =>
        this.dashboardService.updateApplications(applications)
      );
    this.applications = this.dashboardService.applications;
    console.log(this.applications);
  }

  public logout() {
    this.authService.logoutUser();
  }
}
