import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav>
      <a routerLink="/" class="brand">AssignmentTracker</a>
      <div class="nav-links">
        <ng-container *ngIf="authService.isAuthenticated(); else guestLinks">
          <a routerLink="/dashboard">Dashboard</a>
          <button (click)="logout()">Logout</button>
        </ng-container>
        <ng-template #guestLinks>
          <a routerLink="/login">Login</a>
          <a routerLink="/register" class="btn btn-primary" style="color: white; margin-left: 1rem;">Register</a>
        </ng-template>
      </div>
    </nav>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
