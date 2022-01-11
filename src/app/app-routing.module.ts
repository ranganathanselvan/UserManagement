import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './auth/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';

import { AuthGuard } from './_helpers/auth.guard';
import { AuthGuardLogin } from './_helpers/auth.guard.login';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'userdashboard', component: UserDashboardComponent},
  {path: 'viewuser', component: ManageUserComponent},
  {path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
