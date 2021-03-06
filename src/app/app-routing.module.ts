import { UsersComponent } from './registrations/users/users.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/authService/auth.guard';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users', component: UsersComponent,
    canActivate: [AuthGuard]
  },
  { path: 'reset', component: ResetPasswordComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
