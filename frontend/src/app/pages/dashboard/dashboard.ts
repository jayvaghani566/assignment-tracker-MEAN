import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssignmentService, Assignment } from '../../services/assignment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="margin-top: 2rem;">
      <h2 style="margin-bottom: 1.5rem;">Your Assignments</h2>
      
      <div class="card" style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">Add New Assignment</h3>
        <form (ngSubmit)="addAssignment()" style="display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap;">
          <div class="form-group" style="margin-bottom: 0; flex: 1; min-width: 200px;">
            <label for="subject">Subject</label>
            <input type="text" id="subject" class="form-control" [(ngModel)]="newSubject" name="subject" required>
          </div>
          <div class="form-group" style="margin-bottom: 0; flex: 2; min-width: 250px;">
            <label for="title">Title</label>
            <input type="text" id="title" class="form-control" [(ngModel)]="newTitle" name="title" required>
          </div>
          <div class="form-group" style="margin-bottom: 0; flex: 1; min-width: 150px;">
            <label for="dueDate">Due Date</label>
            <input type="date" id="dueDate" class="form-control" [(ngModel)]="newDueDate" name="dueDate" required>
          </div>
          <div style="flex-shrink: 0;">
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </form>
      </div>

      <div class="card" style="padding: 0; overflow: hidden;">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Title</th>
              <th>Due Date</th>
              <th>Status</th>
              <th style="width: 200px;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngIf="assignments.length === 0">
              <td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                No assignments found. Add one above!
              </td>
            </tr>
            <tr *ngFor="let m of assignments">
              <td style="font-weight: 500;">{{ m.subject }}</td>
              <td>{{ m.title }}</td>
              <td>{{ m.dueDate | date:'mediumDate' }}</td>
              <td>
                <span class="status-badge" [ngClass]="m.status === 'Completed' ? 'status-completed' : 'status-pending'">
                  {{ m.status }}
                </span>
              </td>
              <td>
                <div class="actions">
                  <button *ngIf="m.status !== 'Completed'" class="btn btn-success" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;" (click)="markComplete(m)">Complete</button>
                  <button class="btn btn-danger" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;" (click)="deleteAssignment(m._id!)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  assignments: Assignment[] = [];
  
  newSubject = '';
  newTitle = '';
  newDueDate = '';

  private assignmentService = inject(AssignmentService);

  ngOnInit() {
    this.loadAssignments();
  }

  loadAssignments() {
    this.assignmentService.getAssignments().subscribe({
      next: (data) => this.assignments = data,
      error: (err: any) => console.error(err)
    });
  }

  addAssignment() {
    if (!this.newSubject || !this.newTitle || !this.newDueDate) return;

    const newAssignment: Assignment = {
      subject: this.newSubject,
      title: this.newTitle,
      dueDate: this.newDueDate
    };

    this.assignmentService.createAssignment(newAssignment).subscribe({
      next: (assignment) => {
        this.assignments.push(assignment);
        this.newSubject = '';
        this.newTitle = '';
        this.newDueDate = '';
      },
      error: (err: any) => console.error(err)
    });
  }

  markComplete(assignment: Assignment) {
    if (!assignment._id) return;
    this.assignmentService.markComplete(assignment._id).subscribe({
      next: (updated) => {
        assignment.status = updated.status;
      },
      error: (err: any) => console.error(err)
    });
  }

  deleteAssignment(id: string) {
    this.assignmentService.deleteAssignment(id).subscribe({
      next: () => {
        this.assignments = this.assignments.filter(a => a._id !== id);
      },
      error: (err: any) => console.error(err)
    });
  }
}
