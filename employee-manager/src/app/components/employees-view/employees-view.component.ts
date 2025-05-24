import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.interface';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employees-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees-view.component.html',
  styleUrl: './employees-view.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesViewComponent implements OnInit, OnDestroy {
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

  private subscriptions = new Subscription();

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.employeeService.employees$.subscribe((data: Employee[]) => {
        this.employees = data;
        this.applyFilters();
        this.updateFilterLists();
        this.cdr.markForCheck();
      })
    );
    this.subscriptions.add(
      this.employeeService.loading$.subscribe((loading: boolean) => {
        this.loading = loading;
        this.cdr.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
    this.cdr.markForCheck();
  }

  onEditEmployee(employee: Employee): void {
    console.log('Edit employee:', employee);
    // We'll implement this later with the dialog
  }

  onDeleteEmployee(id: number): void {
    // We'll refactor this to use Akita in the next step
    this.loading = true;
    this.cdr.markForCheck();
    this.employeeService.deleteEmployee(id)
      .subscribe({
        next: () => {
          this.employeeService.commitDeleteEmployee(id);
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
  }

  clearFilters(): void {
    this.nameFilter = '';
    this.departmentFilter = '';
    this.cityFilter = '';
    this.filteredEmployees = this.employees;
    this.cdr.markForCheck();
  }
}
