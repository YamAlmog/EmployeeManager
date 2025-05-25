import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../models/employee.interface';

@Component({
  selector: 'app-edit-employee-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay">
      <div class="modal-dialog">
        <h3>{{ isAdding ? 'Add Employee' : 'Edit Employee' }}</h3>
        <form #editForm="ngForm" (ngSubmit)="onSave()">
          <div class="form-group" *ngIf="!isAdding">
            <label>ID</label>
            <input type="number" [(ngModel)]="editEmployee.id" name="id" required #idField="ngModel" />
            <div class="error" *ngIf="duplicateId">Duplicate ID not allowed.</div>
            <div class="error" *ngIf="idField.invalid && idField.touched && !duplicateId">
              Please enter a valid numeric ID.
            </div>
          </div>
          <div class="form-group">
            <label>First Name</label>
            <input type="text" [(ngModel)]="editEmployee.firstName" name="firstName" required pattern="^[A-Za-z\\s-]+$" #firstName="ngModel" />
            <div class="error" *ngIf="firstName.invalid && firstName.touched">
              Only letters, spaces, and hyphens are allowed.
            </div>
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" [(ngModel)]="editEmployee.lastName" name="lastName" required pattern="^[A-Za-z\\s-]+$" #lastName="ngModel" />
            <div class="error" *ngIf="lastName.invalid && lastName.touched">
              Only letters, spaces, and hyphens are allowed.
            </div>
          </div>
          <div class="form-group">
            <label>Age</label>
            <input type="number" [(ngModel)]="editEmployee.age" name="age" required min="15" max="120" #age="ngModel" />
            <div class="error" *ngIf="age.invalid && age.touched">
              Please enter a valid age (15-120).
            </div>
          </div>
          <div class="form-group">
            <label>City</label>
            <input type="text" [(ngModel)]="editEmployee.address.city" name="city" required pattern="^[A-Za-z\\s-]+$" #city="ngModel" />
            <div class="error" *ngIf="city.invalid && city.touched">
              Only letters, spaces, and hyphens are allowed.
            </div>
          </div>
          <div class="form-group">
            <label>Street</label>
            <input type="text" [(ngModel)]="editEmployee.address.street" name="street" required pattern="^[A-Za-z0-9\\s-]+$" #street="ngModel" />
            <div class="error" *ngIf="street.invalid && street.touched">
              Only letters, numbers, spaces, and hyphens are allowed.
            </div>
          </div>
          <div class="form-group">
            <label>Department</label>
            <input type="text" [(ngModel)]="editEmployee.department" name="department" required pattern="^[A-Za-z\\s-]+$" #department="ngModel" />
            <div class="error" *ngIf="department.invalid && department.touched">
              Only letters, spaces, and hyphens are allowed.
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" (click)="onCancel()">Cancel</button>
            <button type="submit" [disabled]="editForm.invalid || duplicateId">Save</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-dialog {
      background: #fff;
      padding: 2rem;
      border-radius: 8px;
      min-width: 320px;
      max-width: 90vw;
      box-shadow: 0 2px 16px rgba(0,0,0,0.2);
    }
    .form-group {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
    }
    .form-group label {
      font-weight: 500;
      margin-bottom: 0.25rem;
    }
    .form-group input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .modal-actions button {
      padding: 0.5rem 1.2rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
    .modal-actions button[type="button"] {
      background: #eee;
      color: #333;
    }
    .modal-actions button[type="submit"] {
      background: #007bff;
      color: #fff;
    }
    .modal-actions button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .error {
      color: #dc3545;
      font-size: 0.9rem;
      margin-top: 0.25rem;
    }
  `]
})
export class EditEmployeeDialogComponent {
  @Input() employee!: Employee;
  @Input() allEmployeeIds: number[] = [];
  @Input() isAdding = false;
  @Output() save = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter<void>();

  editEmployee!: Employee;
  duplicateId = false;

  ngOnInit() {
    // Deep copy to avoid mutating the original
    this.editEmployee = JSON.parse(JSON.stringify(this.employee));
  }

  ngDoCheck() {
    // Check for duplicate ID (excluding the current employee)
    this.duplicateId = this.allEmployeeIds
      .filter(id => id !== this.employee.id)
      .includes(this.editEmployee.id);
  }

  onSave() {
    if (!this.duplicateId) {
      this.save.emit(this.editEmployee);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
} 