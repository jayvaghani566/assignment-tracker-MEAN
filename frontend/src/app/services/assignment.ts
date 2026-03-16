import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

export interface Assignment {
  _id?: string;
  userId?: string;
  subject: string;
  title: string;
  dueDate: string;
  status?: 'Pending' | 'Completed';
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:3000/api/assignments';

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  getAssignments() {
    return this.http.get<Assignment[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createAssignment(assignment: Assignment) {
    return this.http.post<Assignment>(this.apiUrl, assignment, { headers: this.getHeaders() });
  }

  markComplete(id: string) {
    return this.http.put<Assignment>(`${this.apiUrl}/${id}/complete`, {}, { headers: this.getHeaders() });
  }

  deleteAssignment(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
