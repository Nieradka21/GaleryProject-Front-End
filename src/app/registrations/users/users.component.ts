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
  editar = false;


  constructor(

    private userService: UsersService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal


  ) { }

  ngOnInit() {
    this.carregar = false;
    this.spinner.show();
    this.criarTable();

    this.criarForm();



  }

  close() {
    this.message = "";
    this.messageType = "";
  }

  criarTable() {

    this.userService.getUsuario().subscribe(usuarios => this.usuarios = usuarios);

  }

  criarForm() {

    this.cadUs = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      access: this.formBuilder.control('', [Validators.required]),
      pass: this.formBuilder.control('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    this.editar = false;
    this.user = this.cadUs.value;

    if (!this.editar) {
      this.carregar = true;
      this.userService.cadastrarUsuario(this.user)
        .subscribe(
          res => {
            console.log(res);
            this.cadUs = this.formBuilder.group({
              name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
              pass: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
              access: this.formBuilder.control('',[Validators.required])
            });
            this.criarTable();
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

    else {
      this.carregar = true;
      this.editar = false;
      this.userService.editarUsuario(this.user)
        .subscribe(
          res => {
            console.log(res);
            this.cadUs = this.formBuilder.group({
              name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
              pass: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
              access: this.formBuilder.control('',[Validators.required])
            });
            this.criarTable();
            this.messageType = 'success';
            this.message = 'Editado com sucesso';
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

      console.log(this.user);
    }
  }


  editarClick(us: Usuarios) {
    this.user.id = us.id;
    this.editar = true;
    console.log(us.id)
    this.cadUs = this.formBuilder.group({
      id: this.formBuilder.control(us.id),
      name: this.formBuilder.control(us.name),
      pass: this.formBuilder.control(us.pass),
      access: this.formBuilder.control(us.access)
    })
  }

  deletarClick(us) {

    this.user = us.id;

    this.userService.deletarUsuario(this.user)
      .subscribe(
        res => {
          console.log(res);
          this.criarTable();
          this.messageType = 'success';
          this.message = 'Deletado com sucesso';
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

}
