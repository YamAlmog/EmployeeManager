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
  loading = false; // Observable boolean tells when employee data is being loaded, show or hide a loading indicator bar

  nameFilter = '';
  departmentFilter = '';
  cityFilter = '';

  departments: string[] = [];
  cities: string[] = [];

  editingEmployee: Employee | null = null;
  isAdding = false; //    tracks if the dialog is in "add mode"

  private subscriptions = new Subscription();

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef    // Injects ChangeDetectorRef to manually trigger change detection
  ) {}

  ngOnInit(): void {    // runs once when a component is initialized, sets up listeners for employee data
    this.subscriptions.add(
      this.employeeService.employees$.subscribe((data: Employee[]) => {
        this.employees = data;
        this.applyFilters();
        this.updateFilterLists();
        this.cdr.markForCheck();    // Manually mark component for check to update the view
      })
    );

    this.subscriptions.add(
      this.employeeService.loading$.subscribe((loading: boolean) => {
        this.loading = loading;
        this.cdr.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {   // call this when the component is about to be destroyed
    this.subscriptions.unsubscribe();   // ensures that all observable streams are properly closed
  }

  updateFilterLists(): void {
    const allDepartments = this.employees.map(emp => emp.department);
    this.departments = Array.from(new Set(allDepartments)).sort();

    const allCities = this.employees.map(emp => emp.address.city);
    this.cities = Array.from(new Set(allCities)).sort();
  }

  applyFilters(): void {
    let filtered = this.employees;
    if (this.nameFilter) {
      const search = this.nameFilter.toLowerCase();
      filtered = filtered.filter(employee =>
        (`${employee.firstName} ${employee.lastName}`).toLowerCase().includes(search)
      );
    }
    if (this.departmentFilter) {
      filtered = filtered.filter(employee =>
        employee.department === this.departmentFilter
      );
    }
    if (this.cityFilter) {
      filtered = filtered.filter(employee =>
        employee.address.city === this.cityFilter
      );
    }
    this.filteredEmployees = filtered;
    this.cdr.markForCheck();
  }

  onEditEmployee(employee: Employee): void {
    this.editingEmployee = employee;
    this.isAdding = false;    // Indicating that we are in edit mode not add mode
    this.cdr.markForCheck();
  }

  onDialogSave(updatedEmployee: Employee): void {
    if (!this.editingEmployee) return; // If there is no employee being edited, do nothing

    if (this.isAdding) {
      // adding a new employee
      this.employeeService.addEmployee(updatedEmployee);   // send the object as-is; backend will create the id
    } else {
      // editing an existing employee
      this.employeeService.updateEmployee(this.editingEmployee.id!, updatedEmployee);  //  ! means id is defined here for sure 
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

  refreshEmployees(): void {
    this.employeeService.refreshEmployees();
  }

  onAddEmployee(): void {
    this.editingEmployee = {
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
