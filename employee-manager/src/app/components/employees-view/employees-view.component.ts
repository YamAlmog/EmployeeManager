import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.interface';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import { HighlightPipe } from './highlight.pipe';

@Component({
  selector: 'app-employees-view',
  standalone: true,
  imports: [CommonModule, FormsModule, EditEmployeeDialogComponent, HighlightPipe],
  templateUrl: './employees-view.component.html',
  styleUrl: './employees-view.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesViewComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  loading = false;

  nameFilter = '';
  departmentFilter = '';
  cityFilter = '';

  departments: string[] = [];
  cities: string[] = [];

  editingEmployee: Employee | null = null;
  isAdding = false;

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
    this.isAdding = false;
    this.cdr.markForCheck();
  }

  onDialogSave(updated: Employee): void {
    if (!this.editingEmployee) return;
    
    if (this.isAdding) {
      const { id, ...employeeData } = updated;
      this.employeeService.addEmployee(employeeData);
    } else {
      this.employeeService.updateEmployee(this.editingEmployee.id, updated);
    }
    this.editingEmployee = null;
    this.isAdding = false;
    this.cdr.markForCheck();
  }

  onDialogCancel(): void {
    this.editingEmployee = null;
    this.cdr.markForCheck();
  }

  onDeleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
    }
  }

  clearFilters(): void {
    this.nameFilter = '';
    this.departmentFilter = '';
    this.cityFilter = '';
    this.applyFilters();
  }

  get allEmployeeIds(): number[] {
    return this.employees.map(e => e.id);
  }

  refreshEmployees(): void {
    this.employeeService.refreshEmployees();
  }

  onAddEmployee(): void {
    this.editingEmployee = {
      id: 0, // or undefined, but 0 is fine for a new employee
      firstName: '',
      lastName: '',
      age: 18,
      address: { city: '', street: '' },
      department: ''
    };
    this.isAdding = true;
    this.cdr.markForCheck();
  }
}
