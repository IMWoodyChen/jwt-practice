import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'protected',
    loadComponent: () => import('./pages/protected/protected.component').then(m => m.ProtectedComponent),
    canActivate: [() => {
      const authService = inject(AuthService);
      const router = inject(Router);
      if (!authService.isLoggedIn()) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    }]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
