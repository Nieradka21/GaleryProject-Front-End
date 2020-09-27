import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuarios } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/userService/users.service';

@Component({
  selector: 'app-login-reset',
  templateUrl: './login-reset.component.html',
  styleUrls: ['./login-reset.component.css']
})
export class LoginResetComponent implements OnInit {
  carregar = false;
  valida = false;
  erro = false;
  loginForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({

      email1: this.fb.control('', [Validators.required, Validators.email]),
      email2: this.fb.control('', [Validators.required, Validators.email]),
    })
  }

  reset() {
    this.carregar = true;
    const reset = {} as Usuarios;
    reset.email = this.loginForm.controls.email1.value;

    if (this.loginForm.controls.email1.value == this.loginForm.controls.email2.value) {
      
      this.userService.enviarEmail(reset)
        .subscribe(
          res => {
            this.carregar = false;
            console.log(res);
            this.activeModal.close();
          }, err => {
            console.log(err)
            this.erro = true;
          }
        )


    } else {
      this.valida = true;
    }

  }

}
