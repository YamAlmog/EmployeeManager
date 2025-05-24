import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Employee } from '../models/employee.interface';
import { MOCK_EMPLOYEES } from '../mock/employees.mock';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees = MOCK_EMPLOYEES;

  constructor() { }

  // Get all employees with simulated API delay
  getEmployees(): Observable<Employee[]> {
    return of(this.employees).pipe(
      delay(2000) // Simulate 2 second network delay
    );
  }

  // Get employee by ID
  getEmployeeById(id: number): Observable<Employee | undefined> {
    const employee = this.employees.find(emp => emp.id === id);
    return of(employee).pipe(
      delay(2000)
    );
  }

  // Add new employee
  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    const newEmployee = {
      ...employee,
      id: this.generateNewId()
    };
    this.employees.push(newEmployee);
    return of(newEmployee).pipe(
      delay(2000)
    );
  }

  // Update employee
  updateEmployee(id: number, employee: Partial<Employee>): Observable<Employee | undefined> {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees[index] = { ...this.employees[index], ...employee };
      return of(this.employees[index]).pipe(
        delay(2000)
      );
    }
    return of(undefined).pipe(
      delay(2000)
    );
  }

  // Delete employee
  deleteEmployee(id: number): Observable<boolean> {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
      return of(true).pipe(
        delay(2000)
      );
    }
    return of(false).pipe(
      delay(2000)
    );
  }

  // Helper method to generate new ID
  private generateNewId(): number {
    return Math.max(...this.employees.map(emp => emp.id)) + 1;
  }
}
