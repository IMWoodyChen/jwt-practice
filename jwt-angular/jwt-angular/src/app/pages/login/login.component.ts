import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/protected']);
    }
  }

  login() {
    if (this.formGroup.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      const username = this.formGroup.get('username')?.value || '';
      const password = this.formGroup.get('password')?.value || '';

      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.loading = false;
          this.router.navigate(['/protected']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.status === 401 
            ? 'Invalid username or password' 
            : 'Login failed. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }
}
