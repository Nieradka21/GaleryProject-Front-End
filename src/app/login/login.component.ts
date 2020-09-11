import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../registrations/users/users.service';
import { Usuarios } from '../registrations/users/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Usuarios = {} as Usuarios;
  public img = "../assets/img/baixados.png";

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private loginService: UsersService) {
    this.loginForm = this.fb.group({

      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      pass: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit() {

  }

  login() {

    const login = {} as Usuarios;
    login.name = this.loginForm.controls.name.value;
    login.pass = this.loginForm.controls.pass.value;

    console.log(login)
      this.loginService.login(login)
      .subscribe(
        res => {
          console.log(res);
          this.loginService.setUser(res);
        }
      )
  }


  criarForm() {

  }




}
