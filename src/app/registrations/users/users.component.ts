import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { Usuarios } from './user.model';
import { UsersService } from './users.service';
import { Component, OnInit, Input, PipeTransform } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { ExcluirUsersComponent } from './excluir-users/excluir-users.component';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter, startWith } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [NgbTypeaheadConfig]
})

export class UsersComponent implements OnInit {

  page = 1;
  usuarios: Usuarios[] = [];
  user: Usuarios = {} as Usuarios;
  cadUs: FormGroup;
  message: string;
  messageType: string;
  carregar = false;
  editar = false;

  pageSize = 2;

  public model: Usuarios[];

  users$: Observable<Usuarios[]>;
  filter = new FormControl('');

  formatter = (us: Usuarios) => us.name;
  //id: number;

  search(text: string, pipe: PipeTransform): Usuarios[] {
    return this.usuarios.filter(us => {
      const term = text.toLowerCase();
      return us.name.toLowerCase().includes(term)
        || pipe.transform(us.access).includes(term)
        || pipe.transform(us.pass).includes(term);
    });
  }

  constructor(

    private userService: UsersService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,

    pipe: DecimalPipe,

    config: NgbTypeaheadConfig


  ) { //config.showHint = true,
    this.users$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );

    this.userService.getUsuario().subscribe(us => this.usuarios = us)

  }
  criarTable() {
    this.userService.getUsuario().subscribe(us => this.usuarios = us)
  }


  ngOnInit() {
    this.carregar = false;
    this.spinner.show();
    this.criarForm();
    this.criarTable();

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
                this.criarTable();

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
