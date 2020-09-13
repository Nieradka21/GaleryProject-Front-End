import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuarios, Page, Pageable } from '../../models/user.model';
import { UsersService } from '../../services/userService/users.service';
import { Component, OnInit, } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { ExcluirUsersComponent } from './excluir-users/excluir-users.component';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { UserFormComponent } from './user-form/user-form.component';





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

  message: string;
  messageType: string;
  carregar = false;
  pageSize = 5;
  homePage = 0;

  filter = new FormControl('');


  constructor(

    private userService: UsersService,

    private spinner: NgxSpinnerService,
    private modalService: NgbModal

  ) {

  }

  ngOnInit() {
    this.carregar = false;
    this.spinner.show();

    this.criarTable(this.homePage, this.pageSize)

    this.filter.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(valor => {
          this.carregar = true;
          return this.userService.getUsuarioBy(valor, 0, this.pageSize)
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

  addUser() {
    const ref = this.modalService.open(UserFormComponent, { centered: true });

    ref.result.then(() => {
      this.criarTable(this.homePage, this.pageSize)
    })
  }

  editarClick(us: Usuarios) {


    const ref = this.modalService.open(UserFormComponent, { centered: true });
    ref.componentInstance.user = us;
    ref.componentInstance.editar = true;

    ref.result.then((result) => {

      if (result) {

        setTimeout(() => {
          console.log(result)
          this.carregar = true;
          this.spinner.show();
          this.userService.editarUsuario(result)
            .subscribe(
              res => {
                console.log(res);
                this.messageType = 'success';
                this.message = 'Alterado com sucesso';
                this.carregar = false;
                this.spinner.hide();
                this.criarTable(this.homePage, this.pageSize);
              },
              error => {
                console.log(error);
                this.messageType = 'danger';
                this.message = 'erro';
                this.carregar = false;
                this.spinner.hide();
              }
            )
        }, 1);

      }



    })

  }


  criarTable(page, pageSize) {
    this.carregar = true;

    this.userService.getUsuario(page, pageSize).subscribe(
      res => {
        this.page = res;
        this.usuarios = this.page.content;
        this.carregar = false;
      }, err => {
        console.log(err);
        this.carregar = false;
      })
  }

  criarTableBy(page, pageSize) {
    this.carregar = true;
    this.userService.getUsuarioBy(this.filter.value, page, pageSize).subscribe(
      res => {
        this.carregar = false;
        this.page = res;
        this.usuarios = this.page.content;
      }, err => {
        console.log(err);
        this.carregar = false;
      })
  }

  changePage(event) {
    console.log(event);
    if (this.filter.value == '') {
      this.criarTable(event.page, event.size);
    } else {
      this.criarTableBy(event.page, event.size);
    }




  }


  close() {
    this.message = "";
    this.messageType = "";
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
