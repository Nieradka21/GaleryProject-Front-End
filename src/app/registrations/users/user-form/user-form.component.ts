import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuarios } from '../user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  cadUs: FormGroup;
  user: Usuarios = {} as Usuarios;
  message: string;
  messageType: string;
  editar = false;
  carregar = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private userService: UsersService,
  ) { }

  ngOnInit() {
    this.criarForm();
    if (this.editar) {
      this.carregarTudo(this.user)
    }
  }

  criarForm() {
    this.cadUs = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      access: this.formBuilder.control('', [Validators.required]),
      pass: this.formBuilder.control('', [Validators.required, Validators.minLength(6)])
    });
  }
  carregarTudo(us: Usuarios) {
    this.cadUs = this.formBuilder.group({
      id: this.formBuilder.control(us.id,),
      name: this.formBuilder.control(us.name, [Validators.required, Validators.minLength(3)]),
      access: this.formBuilder.control(us.access, [Validators.required]),
      pass: this.formBuilder.control(us.pass, [Validators.required, Validators.minLength(6)])
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
            this.messageType = 'success';
            this.message = 'Cadastro realizado com sucesso';
            this.carregar = false;
            this.spinner.hide();
            this.cadUs.reset();

          },
          error => {
            console.log(error);
            this.messageType = 'danger';
            this.message = 'erro';
            this.carregar = false;
            this.spinner.hide();

          }
        )
    } else {
      this.activeModal.close(this.user)
    }


  }
  close() {
    this.message = "";
    this.messageType = "";
  }









}
