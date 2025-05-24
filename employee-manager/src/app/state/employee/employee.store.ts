import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { EmployeeState } from './employee.state';
import { Employee } from '../../models/employee.interface';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'employees', idKey: 'id' })
export class EmployeeStore extends EntityStore<EmployeeState, Employee, number> {
  constructor() {
    super();
  }
} 