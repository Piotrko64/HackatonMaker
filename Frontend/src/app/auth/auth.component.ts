import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthMode } from './types/AuthMode.enum';
import { HttpClient } from '@angular/common/http';
import { ManagePopupService } from '../core/services/manage-popup.service';
import { PopupState } from '../shared/types/PopupState.enum';
import { addUserMessage } from './constants/addUserMessage';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
const STRONG_PASSWORD_REGEX =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  protected authForm: FormGroup;
  protected currentMode: AuthMode = AuthMode.SIGN_IN;
  protected modes = AuthMode;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private popupService: ManagePopupService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authForm = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', [
        Validators.pattern(STRONG_PASSWORD_REGEX),
        Validators.required,
      ]),
    });
  }

  protected toggleAuthMode() {
    this.currentMode =
      this.currentMode === AuthMode.SIGN_IN
        ? AuthMode.SIGN_UP
        : AuthMode.SIGN_IN;
  }

  protected onSubmit() {
    if (this.currentMode === AuthMode.SIGN_IN) {
      this.signIn();
    } else {
      this.signUp();
    }
  }

  private signIn() {
    this.authService.signIn(this.authForm.value).subscribe(() => {
      this.router.navigate(['dashboard']);
    });
  }

  private signUp() {
    this.authService.signUp(this.authForm.value).subscribe((userData) => {
      this.popupService.openDialog(
        PopupState.OK,
        addUserMessage(userData.email)
      );
      this.authForm.reset();
      this.currentMode = AuthMode.SIGN_IN;
      (this.authForm.get('password') as FormControl).setErrors({
        require: false,
      });
    });
  }

  get emailFormControl() {
    return this.authForm.get('email') as FormControl;
  }

  get passwordFormControl() {
    return this.authForm.get('password') as FormControl;
  }
}
