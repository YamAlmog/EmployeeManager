import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { EmployeeState } from './employee.state';
import { EmployeeStore } from './employee.store';
import { Employee } from '../../models/employee.interface';

@Injectable({ providedIn: 'root' })
export class EmployeeQuery extends QueryEntity<EmployeeState, Employee, number> {
  constructor(protected override store: EmployeeStore) {
    super(store);
  }
} 
// this is a query for the employee state
// it extends the QueryEntity class and passes in the EmployeeState, Employee, and number types
// the EmployeeState is the state of the employee, the Employee is the employee model, and the number is the id type of the employee
// the QueryEntity class is a class that is used to query the state of the employee


