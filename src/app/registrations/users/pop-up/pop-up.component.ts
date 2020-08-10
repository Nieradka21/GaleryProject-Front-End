import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuarios } from '../user.model';
import { UsersComponent } from '../users.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  @Input() title = "Please confirm..";
  @Input() message = "Deseja deletar esse usuario?";
  @Input() btnOkText = "Ok";
  @Input() btnCancelText = "Cancel";

  us: number;

  usr: Component



  constructor(private activeModal: NgbActiveModal,
    private userService: UsersService


  ) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    console.log(this.us)


  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
