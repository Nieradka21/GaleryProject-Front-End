import { GALERY_API } from './../../app.api';
import { Injectable } from '@angular/core';
import { Usuarios, Page } from './user.model';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'


@Injectable()

export class UsersService {

  user: Usuarios = {} as Usuarios;
  options = {};
  constructor(private http: Http) { }

  getUsuario(page, size): Observable<Page> {
    return this.http
      .get(`${GALERY_API}/galery/users?page=${page}&size=${size}`)
      .map(res => res.json())
    //&sort=name&name.dir=asc
  }

  getUsuarioBy(user, page, size): Observable<Page> {
    return this.http
      .get(`${GALERY_API}/galery/users/${user}?page=${page}&size=${size}`)
      .map(res => res.json())
  }

  cadastrarUsuario(user: Usuarios): Observable<any> {
    return this.http.post(`${GALERY_API}/galery/user`, user, this.options)
      .map(response => response.ok)
      
  }
  editarUsuario(user: Usuarios): Observable<any> {

    return this.http.put(`${GALERY_API}/galery/user`, user, this.options)
      .map(response => response.ok)
  }

  deletarUsuario(id): Observable<any> {
    return this.http.delete(`${GALERY_API}/galery/user/${id}`)
      .map(response => response.ok)
  }

}
