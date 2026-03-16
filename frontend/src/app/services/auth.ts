import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000/api/auth';
  
  private authStatusSubj = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatusSubj.asObservable();

  register(credentials: any) {
    return this.http.post<{token: string}>(`${this.apiUrl}/register`, credentials).pipe(
      tap(res => this.setToken(res.token)),
      catchError(err => throwError(() => err))
    );
  }

  login(credentials: any) {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => this.setToken(res.token)),
      catchError(err => throwError(() => err))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatusSubj.next(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private hasToken() {
    return !!localStorage.getItem('token');
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
    this.authStatusSubj.next(true);
  }
}
