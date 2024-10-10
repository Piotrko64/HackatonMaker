import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, tap } from 'rxjs';
import { AuthValue } from 'src/app/shared/types/AuthValue.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoginUser = false;

  constructor(private http: HttpClient, private router: Router) {}

  public setLoginStatus(boolean: boolean) {
    this.isLoginUser = boolean;
  }

  public logoutUser() {
    this.http.delete('/api/auth/signout').subscribe(() => {
      this.isLoginUser = false;
      this.router.navigate(['/auth']);
    });
  }

  public signIn(authValue: AuthValue) {
    return this.http.post('/api/auth/signin', authValue).pipe(
      tap((value) => {
        if (value) this.isLoginUser = true;
      })
    );
  }

  public signUp(authValue: AuthValue) {
    return this.http.post<Record<'email', string>>(
      '/api/auth/signup',
      authValue
    );
  }

  public autoLogin() {
    return this.http.get('/api/auth/whoami').subscribe((response) => {
      console.log(response);
      if (response) {
        this.isLoginUser = true;
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
