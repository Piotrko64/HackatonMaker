import { ManagePopupService } from './../services/manage-popup.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { PopupState } from 'src/app/shared/types/PopupState.enum';

const URL_WITHOUT_POPUP_ERROR = 'auth/whoami';

type ResponseObj = HttpErrorResponse & {
  error: {
    statusCode: number;
    timestamp: string;
    path: string;
    message: string;
  };
};

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private popupService: ManagePopupService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((objError: ResponseObj) => {
        if (!objError.url!.includes(URL_WITHOUT_POPUP_ERROR)) {
          this.popupService.openDialog(PopupState.WARN, objError.error.message);
        }

        return throwError(() => 'ERROR: ' + objError.error.message);
      })
    );
  }
}
