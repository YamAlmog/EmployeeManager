import { Employee } from '../../models/employee.interface';
import { EntityState } from '@datorama/akita';

export interface EmployeeState extends EntityState<Employee, number> {} 

// creates an interface EmployeeState that extends Akita’s EntityState
// state will hold a collection of Employee objects, each identified by a number (the employee’s id)