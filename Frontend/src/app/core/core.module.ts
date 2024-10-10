import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePopupService } from './services/manage-popup.service';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthPageGuard } from './guards/auth-page.guard';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  providers: [ManagePopupService, AuthService, HttpClientModule, AuthPageGuard],
  imports: [CommonModule, SharedModule],
  exports: [HttpClientModule, LoadingSpinnerComponent],
})
export class CoreModule {}
