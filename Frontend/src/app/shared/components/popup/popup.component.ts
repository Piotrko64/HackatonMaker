import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PopupState } from '../../types/PopupState.enum';
import { ManagePopupService } from 'src/app/core/services/manage-popup.service';
import { getHeadingText } from './data/headingTexts';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  protected state: Observable<PopupState>;
  protected text: Observable<string>;
  protected headingText: string;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    private popupService: ManagePopupService
  ) {}

  protected close(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.state = this.popupService.state;
    this.text = this.popupService.text;
    this.headingText = getHeadingText(this.popupService.state.getValue());
  }
}
