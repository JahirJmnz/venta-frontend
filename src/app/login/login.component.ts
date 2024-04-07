import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login({ email, password }).subscribe(
        (success: boolean) => {
          if (success) {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.error('Error en authService.login:', error);
        }
      );
    } else {
      console.error('Email or password is missing');
    }
  }
}