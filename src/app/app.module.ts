import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './services/userService/users.service';
import { UsersComponent } from './registrations/users/users.component';
import { Http, HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ExcluirUsersComponent } from './registrations/users/excluir-users/excluir-users.component';
import { DecimalPipe } from '@angular/common';
import { PaginationComponent } from './pagination/paginacao.component';
import { UserFormComponent } from './registrations/users/user-form/user-form.component';
import { AuthGuard } from './services/authService/auth.guard';
import { LoginResetComponent } from './login/login-reset/login-reset.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    ExcluirUsersComponent,
    PaginationComponent,
    UserFormComponent,
    LoginResetComponent,
    ResetPasswordComponent




  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
    NgxSpinnerModule,



    AppRoutingModule
  ],
  providers: [UsersService, DecimalPipe,AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [UserFormComponent,LoginResetComponent]
})
export class AppModule {



}
