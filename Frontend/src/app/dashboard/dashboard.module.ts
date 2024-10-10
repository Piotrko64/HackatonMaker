import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ApplicationComponent } from './application/application.component';
import { AddApplicationModalComponent } from './add-application-modal/add-application-modal.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { MatDividerModule } from '@angular/material/divider';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];
@NgModule({
  declarations: [
    DashboardComponent,
    ApplicationComponent,
    AddApplicationModalComponent,
    AddApplicationComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class DashboardModule {}
