import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuarios } from '../user.model';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-excluir-users',
  templateUrl: './excluir-users.component.html',
  styleUrls: ['./excluir-users.component.css']
})
export class ExcluirUsersComponent implements OnInit {
  user: Usuarios;
  carregar = false;
  message: string;
  messageType: string;

  constructor(
    private userService: UsersService,
    public modal: NgbActiveModal,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

  }

  excluir() {
    this.carregar = true;
    this.spinner.show();
    setTimeout(() => {
      this.userService.deletarUsuario(this.user.id)
        .subscribe(
          res => {
            console.log(res);

            this.modal.close();
            this.carregar = false;
            // this.user = null;
            this.spinner.hide();

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
  close() { }
}
