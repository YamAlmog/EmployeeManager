import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Employee } from '../models/employee.interface';
import { MOCK_EMPLOYEES } from '../mock/employees.mock';
import { EmployeeStore } from '../state/employee/employee.store';
import { EmployeeQuery } from '../state/employee/employee.query';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees$: Observable<Employee[]>;
  loading$: Observable<boolean>;

  constructor(
    private employeeStore: EmployeeStore,
    private employeeQuery: EmployeeQuery
  ) {
    // Load mock data into the store on service initialization
    this.employeeStore.setLoading(true);
    of(MOCK_EMPLOYEES).pipe(delay(2000)).subscribe(data => {
      this.employeeStore.set(data);
      this.employeeStore.setLoading(false);
    });
    this.employees$ = this.employeeQuery.selectAll();
    this.loading$ = this.employeeQuery.selectLoading();
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
    const newEmployee: Employee = {
      ...employee,
      id: this.generateNewId()
    };
    this.employeeStore.setLoading(true);
    return of(newEmployee).pipe(
      delay(2000)
    );
  }

  // Update employee
  updateEmployee(id: number, employee: Partial<Employee>): Observable<Employee | undefined> {
    this.employeeStore.setLoading(true);
    // Find the current employee
    const current = this.employeeQuery.getEntity(id);
    const updated: Employee | undefined = current ? { ...current, ...employee } : undefined;
    return of(updated).pipe(
      delay(2000)
    );
  }

  // Delete employee
  deleteEmployee(id: number): Observable<boolean> {
    this.employeeStore.setLoading(true);
    const exists = !!this.employeeQuery.getEntity(id);
    return of(exists).pipe(
      delay(2000)
    );
  }

  // Helper method to generate new ID
  private generateNewId(): number {
    const all = this.employeeQuery.getAll();
    return all.length > 0 ? Math.max(...all.map((emp: Employee) => emp.id)) + 1 : 1;
  }

  // Methods to update the store after API simulation
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
}
