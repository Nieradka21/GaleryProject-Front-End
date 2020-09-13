import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-reset',
  templateUrl: './login-reset.component.html',
  styleUrls: ['./login-reset.component.css']
})
export class LoginResetComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

}
