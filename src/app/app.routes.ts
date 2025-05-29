import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent) // If LoginComponent is standalone, this is fine.
                              // Or use loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) // If Dashboard is standalone, this is fine.
                                  // Or use loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
    // You might add an AuthGuard here later: canActivate: [AuthGuard]
  },
  {
    path: '', // Default route
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**', // Wildcard route for a 404 page or redirect
    redirectTo: '/login' // Or a dedicated 404 component
  }
];
