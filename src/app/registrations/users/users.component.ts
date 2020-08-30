import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { Usuarios, Page, Pageable } from './user.model';
import { UsersService } from './users.service';
import { Component, OnInit, Input, PipeTransform } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { ExcluirUsersComponent } from './excluir-users/excluir-users.component';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter, startWith } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
import { padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [NgbTypeaheadConfig]
})

export class UsersComponent implements OnInit {

  page: Page;
  pageNumber: Pageable;
  usuarios: Array<Usuarios>;
  user: Usuarios = {} as Usuarios;
  cadUs: FormGroup;
  message: string;
  messageType: string;
  carregar = false;
  editar = false;
  pageSize = 5;
  homePage = 1;

  constructor(

    private userService: UsersService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
  ) {//this.refreshCountries(); 
  }



  ngOnInit() {
    this.carregar = false;
    this.spinner.show();
    this.criarForm();
    this.criarTable(this.homePage, this.pageSize)
    
  }
  criarTable(page, pageSize) {
    this.userService.getUsuario(page, pageSize).subscribe(res => {
      this.page = res
      this.usuarios = this.page.content;
    })
  }


  refreshCountries() {
    this.usuarios = this.usuarios
      .map((u, i) => ({ id: i + 1, ...u }))
      .slice((this.homePage - 1) * this.pageSize, (this.homePage - 1) *
        this.pageSize + this.pageSize);
  }

  close() {
    this.message = "";
    this.messageType = "";
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
            this.criarTable(0, this.pageSize);
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
            this.criarTable(0, this.pageSize);
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

    const ref = this.modalService.open(ExcluirUsersComponent, { centered: true });
    ref.componentInstance.user = us;


    ref.result.then((result) => {
      console.log(result)
      if (result) {
        this.carregar = true;
        this.spinner.show();
        setTimeout(() => {
          this.userService.deletarUsuario(us.id)
            .subscribe(
              res => {
                console.log(res);
                this.carregar = false;
                this.message = 'Deletado com sucesso'
                this.messageType = 'success'
                this.spinner.hide();
                this.criarTable(0, this.pageSize);

              },
              error => {
                console.log(error);
                this.messageType = 'danger';
                this.message = error;
                this.carregar = false;
                this.spinner.hide();

              }
            )
        }, 1);

      }
    })


  }

}
