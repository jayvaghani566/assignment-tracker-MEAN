import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="card" style="text-align: center; margin-top: 4rem; padding: 4rem 2rem;">
      <h1 style="font-size: 2.5rem; color: var(--primary); margin-bottom: 1rem;">Welcome to AssignmentTracker</h1>
      <p style="font-size: 1.25rem; color: var(--text-muted); margin-bottom: 2rem;">
        The simplest and cleanest way to keep track of your pending and completed assignments.
      </p>
      <div>
        <a routerLink="/login" class="btn btn-outline" style="margin-right: 1rem; padding: 0.75rem 1.5rem; font-size: 1.1rem;">Log In</a>
        <a routerLink="/register" class="btn btn-primary" style="padding: 0.75rem 1.5rem; font-size: 1.1rem; color: white;">Get Started</a>
      </div>
    </div>
  `
})
export class LandingComponent {}
