import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../core/services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  username: string | null = 'User';
  constructor(
    private router: Router,
    private authService: Auth 
  ) {
  }
  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }


}
