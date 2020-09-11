import { Component, OnInit } from '@angular/core';
import { UsersService } from '../registrations/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public img = "../assets/img/logout.png";
  constructor(
    private userService: UsersService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
