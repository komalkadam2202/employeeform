import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { EmployeesRoutingModule } from './employees-routing.module';
import { ListComponent } from './list/list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxCurrencyModule } from "ngx-currency";
import {NgxMaskModule} from 'ngx-mask';
import { AvatarModule } from 'ngx-avatar';


import { QuickComponent } from './quick/quick.component';


TagInputModule.withDefaults({
  tagInput: {
      placeholder: 'Add new tag'
  }
});
const avatarColors = ["#FFB6C1", "#2c3e50", "#95a5a6", "#f39c12", "#1abc9c"];
@NgModule({
  declarations: [ListComponent, AddEmployeeComponent, UpdateEmployeeComponent,QuickComponent, QuickComponent],
  imports: [
    CommonModule,
    TagInputModule,                                                                                 EmployeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxCurrencyModule,
    AvatarModule,
    AvatarModule.forRoot({
      colors: avatarColors
    }),
 
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot()
    
  ]
})
export class EmployeesModule { }

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true
};

