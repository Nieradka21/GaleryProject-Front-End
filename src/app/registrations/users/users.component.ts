import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Usuarios } from './user.model';
import { UsersService } from './users.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PopUpService } from './pop-up/pop-up.services';
import { PopUpComponent } from './pop-up/pop-up.component';
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

  id: number;



  constructor(

    private userService: UsersService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private confirmationDialogService: PopUpService


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
      name: this.formBuilder.control(this.user.name, [Validators.required, Validators.minLength(3)]),
      access: this.formBuilder.control(this.user.access, [Validators.required]),
      pass: this.formBuilder.control(this.user.pass, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    this.user = this.cadUs.value;

    if (!this.editar) {
      this.carregar = true;
      this.userService.cadastrarUsuario(this.user)
        .subscribe(
          res => {
            console.log(res);
            this.editar = false;
            this.cadUs.reset();
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
      this.userService.editarUsuario(this.user)
        .subscribe(
          res => {
            console.log(res);
            this.cadUs.reset();
            this.criarTable();
            this.messageType = 'success';
            this.message = 'Editado com sucesso';
            this.carregar = false;
            this.spinner.hide();
            this.editar = false;
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
    

    this.userService.deletarUsuario(us.id)
      .subscribe(
        res => {
          console.log(res);
          this.criarTable();
          this.cadUs.reset();
          this.messageType = 'success';
          this.message = 'Deletado com sucesso';
          this.carregar = false;
          us=null;
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

  public openConfirmationDialog(us) {
    const modalRef = this.modalService.open(PopUpComponent);
    modalRef.componentInstance.us = us.id;
  }

}
