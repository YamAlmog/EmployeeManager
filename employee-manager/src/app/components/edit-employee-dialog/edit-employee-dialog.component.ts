import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-edit-employee-dialog',  // HTML tag for this dialog component
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css']
})
export class EditEmployeeDialogComponent {
  @Input() employee!: Employee;
  @Input() isAdding = false;    // true if adding a new employee, false if editing
  @Output() save = new EventEmitter<Employee>(); // event sent to parent when Save is clicked
  @Output() cancel = new EventEmitter<void>();   // event sent to parent when Cancel is clicked

  editEmployee!: Employee; // local copy of the employee for editing in the form

  ngOnInit() {
    // make a deep copy so changes in the form don't affect the original until onSave
    this.editEmployee = JSON.parse(JSON.stringify(this.employee));
  }

  onSave() {
    this.save.emit(this.editEmployee);
  }

  onCancel() {
    this.cancel.emit();
  }
} 