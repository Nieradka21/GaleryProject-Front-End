import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuarios } from '../user.model';


@Component({
  selector: 'app-excluir-users',
  templateUrl: './excluir-users.component.html',
  styleUrls: ['./excluir-users.component.css']
})
export class ExcluirUsersComponent implements OnInit {

  user: Usuarios;
  message: string;
  messageType: string;
  constructor(

    public activeModal: NgbActiveModal


  ) { }

  ngOnInit() {

  }

  excluir() {

    this.activeModal.close(true);
  }
  close() {
    this.activeModal.close();
  }
}
