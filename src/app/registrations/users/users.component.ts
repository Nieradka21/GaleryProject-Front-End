import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuarios, Page, Pageable } from './user.model';
import { UsersService } from './users.service';
import { Component, OnInit, } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { ExcluirUsersComponent } from './excluir-users/excluir-users.component';
import { debounceTime, switchMap } from 'rxjs/operators';




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
  homePage = 0;

  filter = new FormControl('');


  constructor(

    private userService: UsersService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal

  ) {

  }

  ngOnInit() {
    this.carregar = false;
    this.spinner.show();
    this.criarForm();
    this.criarTable(this.homePage, this.pageSize)

  }
  criarTable(page, pageSize) {
    this.carregar = true;

    this.userService.getUsuario(page, pageSize).subscribe(res => {
      this.page = res;
      this.usuarios = this.page.content;
      this.carregar = false;
    }, err => {
      console.log(err);
      this.carregar = false;
    })
  }

  criarTableBy(user) {
    /*
         user = this.filter.value;
         this.carregar = true;
         this.userService.getUsuarioBy(user, this.homePage, this.pageSize).subscribe(
           res => {
             this.carregar = false;
             this.page = res;
             this.usuarios = this.page.content;
           }, err => {
             console.log(err);
             this.carregar = false;
           })
     */
    this.filter.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(valor => {
          this.carregar = true;
          return this.userService.getUsuarioBy(valor, this.homePage, this.pageSize);
        })
      ).subscribe(
        res => {
          this.carregar = false;
          this.page = res;
          this.usuarios = this.page.content;
        },
        err => {
          this.carregar = false;
          console.log(err)
        }
      );

  }

  changePage(event) {
    this.criarTable(event.page, event.size);
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
            this.criarTable(this.homePage, this.pageSize);
            this.messageType = 'success';
            this.message = 'Cadastro realizado com sucesso';
            this.carregar = false;
            this.spinner.hide();
            console.log(this.cadUs)

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
            this.criarTable(this.homePage, this.pageSize);
            this.messageType = 'success';
            this.message = 'Alterado com sucesso';
            this.carregar = false;
            this.spinner.hide();
            this.editar = false;
            console.log(this.cadUs)

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

  editarClick(us: Usuarios) {
    this.editar = true;
    this.cadUs = this.formBuilder.group({
      id: this.formBuilder.control(us.id),
      name: this.formBuilder.control(us.name, [Validators.required, Validators.minLength(3)]),
      pass: this.formBuilder.control(us.pass, [Validators.required, Validators.minLength(6)]),
      access: this.formBuilder.control(us.access, [Validators.required])
    })
  }


  deletarClick(us) {

    const ref = this.modalService.open(ExcluirUsersComponent, { centered: true });
    ref.componentInstance.user = us;

    ref.result.then((result) => {

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
                this.criarTable(this.homePage, this.pageSize);

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
