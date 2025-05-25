import { Employee } from '../../models/employee.interface';
import { EntityState } from '@datorama/akita';

export interface EmployeeState extends EntityState<Employee, number> {} 