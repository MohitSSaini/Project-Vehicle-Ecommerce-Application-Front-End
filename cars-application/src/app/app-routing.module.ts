import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RecieptComponent } from './reciept/reciept.component';
import { AuthGuard } from './service/auth/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'admin',canActivate:[AuthGuard],component:AdminDashboardComponent},
  {path:'user',canActivate:[AuthGuard],component:UserDashboardComponent},
  {path:'dashboard',canActivate:[AuthGuard],component:DashboardComponent},
  {path:'cart',canActivate:[AuthGuard],component:CartComponent},
  {path:'reciept',canActivate:[AuthGuard],component:RecieptComponent},
  {path:'**',component:DashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
