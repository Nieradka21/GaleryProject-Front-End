import { Http, HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

import { UsersService } from './users/users.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,

    AppRoutingModule
  ],
  providers: [LoginService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {


}
