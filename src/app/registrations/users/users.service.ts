import { GALERY_API } from './../../app.api';
import { Injectable } from '@angular/core';
import { Usuarios } from './user.model';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { ok } from 'assert';
import { HttpClient } from '@angular/common/http';

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
      .map(response => response.ok)
  }
  editarUsuario(user: Usuarios): Observable<any> {

    return this.http.put(`${GALERY_API}/galery/user`, user, this.options)
      .map(response => response.ok)
  }

  deletarUsuario(user): Observable<any> {
   return this.http.delete(`${GALERY_API}/galery/user/${user}`)
   .map(response => response.ok)


  }
}
