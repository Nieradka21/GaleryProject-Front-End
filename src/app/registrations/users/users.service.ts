import { GALERY_API } from './../../app.api';
import { Injectable } from '@angular/core';
import { Usuarios } from './user.model';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()

export class UsersService {

  user: Usuarios = {} as Usuarios;
  options = {};
  constructor(private http: Http) { }

  getUsuario(): Observable<Usuarios[]> {
    return this.http
      .get(`${GALERY_API}/galery/users`)
      .map(response => response.json())
  }

  cadastrarUsuario(user: Usuarios): Observable<any> {

    return this.http.post(`${GALERY_API}/galery/user`, user, this.options)
      .map(response => response.json())

  }
}
