import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardAuthPageGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (!this.authService.isLoginUser) this.router.navigate(['/auth']);
    else true;
  }
}
