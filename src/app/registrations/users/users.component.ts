import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Usuarios } from './user.model';
import { UsersService } from './users.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  message: string;
  messageType: string;
  carregar = false;


  constructor(

    private userService: UsersService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal


  ) { }

  ngOnInit() {
    this.carregar = false;
    this.spinner.show();

    this.userService.getUsuario().subscribe(usuarios => this.usuarios = usuarios);
    this.criarForm();




  }

  close() {
    this.message = "";
    this.messageType = "";
  }

  criarForm() {

    this.cadUs = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      access: this.formBuilder.control('', [Validators.required]),
      pass: this.formBuilder.control('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    this.carregar = true;
    this.user = this.cadUs.value;
    this.userService.cadastrarUsuario(this.user)
      .subscribe(
        res => {
          console.log(res);
          this.cadUs.reset();
          this.messageType = 'success';
          this.message = 'Cadastro realizado com sucesso';
          this.carregar = false;
          this.spinner.hide();

        },
        error => {
          console.log(error);
          this.messageType = 'danger';
          this.message = 'erro';
          this.carregar = false;
          this.spinner.hide();

        }
      )

  }


  editarClick(us: Usuarios) {
    console.log(us.id)
    this.cadUs = this.formBuilder.group({
      name: this.formBuilder.control(us.name),
      pass: this.formBuilder.control(us.pass),
      access: this.formBuilder.control(us.access)
    })

  }

}
