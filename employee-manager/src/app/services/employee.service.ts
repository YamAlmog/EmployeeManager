import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.interface';
import { EmployeeStore } from '../state/employee/employee.store';
import { EmployeeQuery } from '../state/employee/employee.query';

@Injectable({
  providedIn: 'root'  // makes the service available to the entire application
})
export class EmployeeService {
  private readonly apiUrl = 'http://localhost:3000/api/employees';
  
  employees$: Observable<Employee[]>; // Observable that holds the employees data
  loading$: Observable<boolean>; // Observable that holds the loading state

  constructor(
    private http: HttpClient,
    private employeeStore: EmployeeStore,
    private employeeQuery: EmployeeQuery
  ) {
    this.employees$ = this.employeeQuery.selectAll(); // selectAll() returns all the employees from store
    this.loading$ = this.employeeQuery.selectLoading(); // selectLoading() returns the loading state from store
    this.loadEmployees();
  }

  loadEmployees(): void { // loads the employees from the server
    this.employeeStore.setLoading(true);   // show the loading indicator
    
    this.http.get<Employee[]>(this.apiUrl).subscribe({
      next: (employees) => {  // employees is the data sent back from the server if successful
        this.employeeStore.set(employees);
        this.employeeStore.setLoading(false);   // stop the loading indicator
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.employeeStore.setLoading(false);
      }
    });
  }

  getEmployees(): Observable<Employee[]> {
    return this.employees$; // returns the employees data
  }

  addEmployee(employee: Omit<Employee, 'id'>): void {
    this.employeeStore.setLoading(true);
    
    this.http.post<Employee>(this.apiUrl, employee).subscribe({
      next: (newEmployee) => {
        this.employeeStore.add(newEmployee);
        this.employeeStore.setLoading(false);
        console.log('Employee added successfully!');
      },
      error: (error) => {
        console.error('Error adding employee:', error);
        this.employeeStore.setLoading(false);
      }
    });
  }

  updateEmployee(id: number, employee: Partial<Employee>): void {
    this.employeeStore.setLoading(true);
    
    this.http.put<Employee>(`${this.apiUrl}/${id}`, employee).subscribe({
      next: (updatedEmployee) => {    // updatedEmployee is the data sent back from the server if successful
        this.employeeStore.update(id, updatedEmployee);
        this.employeeStore.setLoading(false);
        console.log('Employee updated successfully!');
      },
      error: (error) => {
        console.error('Error updating employee:', error);
        this.employeeStore.setLoading(false);
      }
    });
  }

  deleteEmployee(id: number): void {
    this.employeeStore.setLoading(true);
    
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.employeeStore.remove(id);   // remove employee from frontend state(akita)
        this.employeeStore.setLoading(false); // stop the loading indicator
        console.log('Employee deleted successfully!');
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        this.employeeStore.setLoading(false);
      }
    });
  }

  refreshEmployees(): void {
    this.loadEmployees();
  }
}
