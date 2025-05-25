import { Routes } from '@angular/router';
import { EmployeesViewComponent } from './components/employees-view/employees-view.component';

export const routes: Routes = [
    { path: '', redirectTo: '/employees', pathMatch: 'full' },
    { path: 'employees', component: EmployeesViewComponent }
];
