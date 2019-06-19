import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetpassComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   ModalModule.forRoot()
  ]
})
export class AuthModule { }
