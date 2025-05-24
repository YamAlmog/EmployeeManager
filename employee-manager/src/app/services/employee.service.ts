import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, catchError } from 'rxjs';
import { Employee } from '../models/employee.interface';
import { EmployeeStore } from '../state/employee/employee.store';
import { EmployeeQuery } from '../state/employee/employee.query';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly apiUrl = 'http://localhost:3000/api/employees';
  
  employees$: Observable<Employee[]>;
  loading$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private employeeStore: EmployeeStore,
    private employeeQuery: EmployeeQuery
  ) {
    // Initialize observables
    this.employees$ = this.employeeQuery.selectAll();
    this.loading$ = this.employeeQuery.selectLoading();
    
    // Load initial data
    this.loadEmployees();
  }

  // Load all employees from API
  private loadEmployees(): void {
    this.employeeStore.setLoading(true);
    this.http.get<Employee[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error loading employees:', error);
        this.employeeStore.setLoading(false);
        return of([]);
      })
    ).subscribe(employees => {
      this.employeeStore.set(employees);
      this.employeeStore.setLoading(false);
    });
  }

  // Get all employees (observable from Akita)
  getEmployees(): Observable<Employee[]> {
    return this.employees$;
  }

  // Get employee by ID
  getEmployeeById(id: number): Observable<Employee | undefined> {
    return this.employeeQuery.selectEntity(id);
  }

  // Add new employee
  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    this.employeeStore.setLoading(true);
    return this.http.post<Employee>(this.apiUrl, employee).pipe(
      catchError(error => {
        console.error('Error adding employee:', error);
        this.employeeStore.setLoading(false);
        throw error;
      })
    );
  }

  // Update employee
  updateEmployee(id: number, employee: Partial<Employee>): Observable<Employee> {
    this.employeeStore.setLoading(true);
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee).pipe(
      catchError(error => {
        console.error('Error updating employee:', error);
        this.employeeStore.setLoading(false);
        throw error;
      })
    );
  }

  // Delete employee
  deleteEmployee(id: number): Observable<any> {
    this.employeeStore.setLoading(true);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting employee:', error);
        this.employeeStore.setLoading(false);
        throw error;
      })
    );
  }

  // Methods to update the store after successful API calls
  commitAddEmployee(employee: Employee) {
    this.employeeStore.add(employee);
    this.employeeStore.setLoading(false);
  }

  commitUpdateEmployee(id: number, employee: Partial<Employee>) {
    this.employeeStore.update(id, employee);
    this.employeeStore.setLoading(false);
  }

  commitDeleteEmployee(id: number) {
    this.employeeStore.remove(id);
    this.employeeStore.setLoading(false);
  }

  // Refresh employees from API
  refreshEmployees(): void {
    this.loadEmployees();
  }
}
