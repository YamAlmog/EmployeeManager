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