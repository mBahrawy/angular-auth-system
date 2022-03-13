import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared-modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BasicDashboardComponent } from './basic-dashboard/basic-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AdminDashboardVerifyGuard } from 'src/app/core/guards/admin-dashboard-verify.guard';


const routes: Routes = [
  {
    path: '',
      component: DashboardComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminDashboardVerifyGuard]

  },
  {
    path: 'basic',
    component: BasicDashboardComponent,
  }
]
@NgModule({
  declarations: [
    AdminDashboardComponent,
    BasicDashboardComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    AdminDashboardVerifyGuard
  ],
  exports: [RouterModule]
})
export class DashboardModule { }
