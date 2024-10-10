import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject } from 'rxjs';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { PopupState } from 'src/app/shared/types/PopupState.enum';

@Injectable({
  providedIn: 'root',
})
export class ManagePopupService {
  state = new BehaviorSubject<PopupState>(PopupState.WARN);
  text = new BehaviorSubject<string>('');

  openDialog(state: PopupState, text: string): void {
    const dialogRef = this.dialog.open(PopupComponent);
    this.text.next(text);
    this.state.next(state);
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  constructor(public dialog: MatDialog) {}
}
