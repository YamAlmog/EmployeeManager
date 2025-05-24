import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.interface';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees-view.component.html',
  styleUrl: './employees-view.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesViewComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  loading = false;

  // Filter properties
  nameFilter = '';
  departmentFilter = '';
  cityFilter = '';

  // Unique lists for select dropdowns
  departments: string[] = [];
  cities: string[] = [];

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.employeeService.getEmployees()
      .subscribe({
        next: (data) => {
          this.employees = data;
          this.filteredEmployees = data;
          this.updateFilterLists();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading employees:', error);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  updateFilterLists(): void {
    this.departments = [...new Set(this.employees.map(emp => emp.department))];
    this.cities = [...new Set(this.employees.map(emp => emp.address.city))];
  }

  applyFilters(): void {
    this.filteredEmployees = this.employees.filter(employee => {
      const nameMatch = !this.nameFilter || 
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(this.nameFilter.toLowerCase());

      const departmentMatch = !this.departmentFilter || 
        employee.department === this.departmentFilter;

      const cityMatch = !this.cityFilter || 
        employee.address.city === this.cityFilter;

      return nameMatch && departmentMatch && cityMatch;
    });
    this.cdr.detectChanges();
  }

  onEditEmployee(employee: Employee): void {
    console.log('Edit employee:', employee);
    // We'll implement this later with the dialog
  }

  onDeleteEmployee(id: number): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.employeeService.deleteEmployee(id)
      .subscribe({
        next: (success) => {
          if (success) {
            this.loadEmployees();
          } else {
            this.loading = false;
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  clearFilters(): void {
    this.nameFilter = '';
    this.departmentFilter = '';
    this.cityFilter = '';
    this.filteredEmployees = this.employees;
    this.cdr.detectChanges();
  }
}
