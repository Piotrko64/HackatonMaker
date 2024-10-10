import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthPageGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (this.authService.isLoginUser) this.router.navigate(['/dashboard']);
    else true;
  }
}
