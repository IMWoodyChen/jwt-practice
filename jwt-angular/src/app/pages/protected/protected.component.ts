import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './protected.component.html',
  styleUrl: './protected.component.scss'
})
export class ProtectedComponent implements OnInit {
  protectedMessage: string = '';
  publicMessage: string = '';
  loading = false;
  error: string = '';

  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProtectedData();
    this.loadPublicData();
  }

  loadProtectedData(): void {
    this.loading = true;
    this.error = '';
    this.apiService.getProtectedHello().subscribe({
      next: (response) => {
        this.protectedMessage = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.status === 401 ? 'Unauthorized - Please login again' : 'Error loading protected data';
        this.loading = false;
        if (err.status === 401) {
          this.authService.logout();
        }
      }
    });
  }

  loadPublicData(): void {
    this.apiService.getPublicHello().subscribe({
      next: (response) => {
        this.publicMessage = response;
      },
      error: (err) => {
        console.error('Error loading public data:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}

