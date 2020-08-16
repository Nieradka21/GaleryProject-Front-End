import { UsersComponent } from './registrations/users/users.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcluirUsersComponent } from './registrations/users/excluir-users/excluir-users.component';


const routes: Routes = [
 
{path:'login',component:LoginComponent},
{path:'home',component:HomeComponent},
{path:'users',component:UsersComponent},
{path:'teste',component:ExcluirUsersComponent},
{path:'',redirectTo:'login',pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
