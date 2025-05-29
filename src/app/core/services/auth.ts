import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 

export interface AuthResponseData {
  success: boolean;
  token?: string;
  userId?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'https://your-api.com/auth';

  constructor(private http: HttpClient) { } 

  login(username: string, password: string): boolean {
    const success = username === 'admin' && password === 'admin';
    if (success) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username); 
      console.log('Auth Service (Mock): Login successful.');
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      console.log('Auth Service (Mock): Login failed.');
    }
    return success;

    /*

    return this.http.post<AuthResponseData>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          if (response && response.success && response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('isAuthenticated', 'true');
            if(response.userId) {
              localStorage.setItem('userId', response.userId);
            }
           
            console.log('Auth Service (API): Login successful, token stored.');
          } else {
           
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
            console.log('Auth Service (API): Login failed - ', response.message || 'No token received.');
          }
        }),
        map(response => response.success), // Return true if API call was successful and login is valid
        catchError(this.handleError)    
      );
    */
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    console.log('Auth Service: User logged out.');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('isAuthenticated');
  }

  getCurrentUsername(): string | null {
    return localStorage.getItem('username');
  }

}
