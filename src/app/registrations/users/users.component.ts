import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuarios } from './user.model';
import { UsersService } from './users.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public paginaAtual = 1;
  usuarios: Usuarios[] = [];
  user: Usuarios = {} as Usuarios;
  cadUs: FormGroup;
  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userService.usuario().subscribe(usuarios => this.usuarios = usuarios);
    this.criarForm();
  }



  criarForm() {

    this.cadUs = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      access: this.formBuilder.control('', [Validators.required]),
      pass: this.formBuilder.control('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    this.user = this.cadUs.value;
    this.userService.cadastrarUsuario(this.user)
      .subscribe(
        res => {
          console.log(res);
          this.cadUs.reset();


        }
      )

  }

}
