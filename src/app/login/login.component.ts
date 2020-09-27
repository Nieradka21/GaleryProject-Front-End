import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/userService/users.service';
import { Usuarios } from '../models/user.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginResetComponent } from './login-reset/login-reset.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Usuarios = {} as Usuarios;
  public img = "../assets/img/baixados.png";
  carregar = false;
  loginForm: FormGroup;
  error = false;

  constructor
    (
      private fb: FormBuilder,
      private loginService: UsersService,
      private router: Router,
      private modalService: NgbModal
    ) {
    this.loginForm = this.fb.group({

      email: this.fb.control('', [Validators.required, Validators.email]),
      pass: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit() {
    //localStorage.clear();
  }

  login() {
    this.carregar = true;
    const login = {} as Usuarios;
    login.email = this.loginForm.controls.email.value;
    login.pass = this.loginForm.controls.pass.value;

    this.loginService.login(login)
      .subscribe(
        res => {
          localStorage['token'] = res.token;
          this.loginService.setUser(res);
          this.router.navigate(['/home']);
          this.carregar = false;
        },
        err => {
          this.error = true;
          this.carregar = false;
          console.log(err)
        }
      )
  }


  resetPass() {
    const ref = this.modalService.open(LoginResetComponent, { centered: true })

    

  }




}
