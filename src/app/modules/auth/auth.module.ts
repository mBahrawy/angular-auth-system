import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared-modules/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgetPasswordComponent
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent 
  ],
  providers:[],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})

export class AuthModule { }
