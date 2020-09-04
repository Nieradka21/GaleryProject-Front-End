import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './registrations/users/users.service';
import { UsersComponent } from './registrations/users/users.component';
import { Http, HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
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
import { UsersFormsComponent } from './registrations/users/users-forms/users-forms.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    ExcluirUsersComponent,
    PaginationComponent,
    UsersFormsComponent




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
  providers: [LoginService, UsersService ,DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule {



}
