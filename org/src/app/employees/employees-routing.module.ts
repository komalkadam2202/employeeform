import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';


import { QuickComponent } from './quick/quick.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {path: 'employees', component: ListComponent,canActivate: [AuthGuard]},

  { path: 'add', component: AddEmployeeComponent },
  { path: 'add/:id', component: AddEmployeeComponent },
  { path: 'update/:id', component: UpdateEmployeeComponent, data: {} },
  { path: 'quick', component: QuickComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
