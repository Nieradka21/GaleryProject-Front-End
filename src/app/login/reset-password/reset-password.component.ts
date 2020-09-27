import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuarios } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/userService/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  carregar = false;
  resetForm: FormGroup;
  token: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.resetForm = this.fb.group({

      pass1: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      pass2: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit() {

    this.token = this.activatedRoute.snapshot.queryParamMap.get("code");

    console.log(this.token)

  }



  login() {
    const reset = {} as Usuarios;
    reset.pass = this.resetForm.controls.pass1.value;
    reset.token = this.token;
    this.usersService.resetPassword(reset)
      .subscribe(
        res => {
          console.log(res)
          this.resetForm.reset();
        },
        err => {
          this.carregar = false;
          console.log(err)
        }
      )


  }
}
