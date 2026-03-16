import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="card" style="max-width: 400px; margin: 4rem auto;">
      <h2 style="margin-bottom: 1.5rem; text-align: center;">Register</h2>
      <div *ngIf="errorMessage" style="color: var(--danger); margin-bottom: 1rem; text-align: center;">
        {{ errorMessage }}
      </div>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" class="form-control" [(ngModel)]="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" class="form-control" [(ngModel)]="password" name="password" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Register</button>
      </form>
      <p style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem;">
        Already have an account? <a routerLink="/login" style="color: var(--primary);">Log in here</a>.
      </p>
    </div>
  `
})
export class RegisterComponent {
  email = '';
  password = '';
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }
}
