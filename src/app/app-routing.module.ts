import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard/dashboard.routes';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'', component:DashboardComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DashboardRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
