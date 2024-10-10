import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/types/DialogData.type';

@Component({
  selector: 'app-add-application-modal',
  templateUrl: './add-application-modal.component.html',
  styleUrls: ['./add-application-modal.component.scss'],
})
export class AddApplicationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddApplicationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
