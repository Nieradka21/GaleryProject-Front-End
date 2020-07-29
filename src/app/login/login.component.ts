import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public img = "../assets/img/baixados.png";

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({

      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      pass: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    })
  }

  login() {
    this.loginService.login(
      this.loginForm.value.name,
      this.loginForm.value.pass
      ).subscribe(user=> console.log(user))
  }




}
