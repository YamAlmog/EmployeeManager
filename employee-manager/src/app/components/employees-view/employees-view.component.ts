import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.interface';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees-view.component.html',
  styleUrl: './employees-view.component.css'
})
export class EmployeesViewComponent implements OnInit {
  employees: Employee[] = [];
  loading = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployees()
      .subscribe({
        next: (data) => {
          this.employees = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading employees:', error);
          this.loading = false;
        }
      });
  }

  onEditEmployee(employee: Employee): void {
    console.log('Edit employee:', employee);
    // We'll implement this later
  }

  onDeleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id)
      .subscribe({
        next: (success) => {
          if (success) {
            this.loadEmployees(); // Reload the list after deletion
          }
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
        }
      });
  }
}
