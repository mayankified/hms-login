import { Component } from '@angular/core';
import { NgForm, FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  selectedYear: string = '2025';
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(form: NgForm): void {
    this.errorMessage = null;

    if (form.invalid) {
      this.errorMessage = "Please fill in all required fields (username and password).";
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.isLoading = true;

    console.log('Login Attempt:', {
      year: this.selectedYear,
      username: this.username,
      rememberMe: this.rememberMe
    });

    try {
      const loginSuccess = this.authService.login(this.username, this.password);

      this.isLoading = false;
      if (loginSuccess) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    } catch (error) {
      this.isLoading = false;
      this.errorMessage = 'An unexpected error occurred during login.';
      console.error("Login error:", error);
    }
  }

  
}
