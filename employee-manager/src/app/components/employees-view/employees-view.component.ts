import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.interface';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog.component';

@Component({
  selector: 'app-employees-view',
  standalone: true,
  imports: [CommonModule, FormsModule, EditEmployeeDialogComponent],
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

  // Modal dialog state
  editingEmployee: Employee | null = null;

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
    this.editingEmployee = employee;
    this.cdr.markForCheck();
  }

  onDialogSave(updated: Employee): void {
    if (!this.editingEmployee) return;
    this.loading = true;
    this.cdr.markForCheck();
    this.employeeService.updateEmployee(this.editingEmployee.id, updated)
      .subscribe({
        next: (result) => {
          if (result) {
            this.employeeService.commitUpdateEmployee(this.editingEmployee!.id, updated);
          }
          this.editingEmployee = null;
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error updating employee:', error);
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
  }

  onDialogCancel(): void {
    this.editingEmployee = null;
    this.cdr.markForCheck();
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

  get allEmployeeIds(): number[] {
    return this.employees.map(e => e.id);
  }
}
