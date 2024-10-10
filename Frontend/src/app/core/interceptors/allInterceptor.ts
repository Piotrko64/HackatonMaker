import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlingInterceptor } from './error-handling.interceptor';
import { LoadingInterceptor } from './loading.interceptor';

export function getAllInterceptors() {
  return interceptors.map((inter) => {
    return {
      multi: true,
      provide: HTTP_INTERCEPTORS,

      useClass: inter,
    };
  });
}

const interceptors = [LoadingInterceptor, ErrorHandlingInterceptor];
