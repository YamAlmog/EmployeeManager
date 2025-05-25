import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-edit-employee-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css']
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