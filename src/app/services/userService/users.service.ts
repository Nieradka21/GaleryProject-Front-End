import { GALERY_API } from '../../app.api';
import { Injectable, EventEmitter } from '@angular/core';
import { Usuarios, Page } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';


@Injectable()

export class UsersService {

  user: Usuarios = {} as Usuarios;
  options = {};
  messageEvent = new EventEmitter();
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    let user: Usuarios = JSON.parse(localStorage.getItem('token'));
    if (user != null) {
      this.user = user;
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',

        'Authorization': "Bearer " + this.user.token


      });
      this.options = {
        headers: httpHeaders
      };
    }
  }

  login(user: Usuarios): Observable<Usuarios> {
    return this.http.post<any>(`${GALERY_API}/auth`, user)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );

  }

  logout() {
    this.user = {} as Usuarios;
    localStorage.clear();
    this.messageEvent.emit(this.user);
    //this.router.navigate(['']);
  }
  setUser(user: Usuarios) {
    this.user = user;
    localStorage.setItem('token', JSON.stringify(user));
    this.messageEvent.emit(user);

    this.httpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',

        'Authorization': "Bearer " + this.user.token
      }
    );
    this.options = {
      headers: this.httpHeaders
    };
  }

  getUsuario(page, size): Observable<Page> {
    return this.http
      .get<Page>(`${GALERY_API}/galery/users?page=${page}&size=${size}`, this.options)
      .map(res => res)
    //&sort=name&name.dir=asc
  }

  getUsuarioBy(user, page, size): Observable<Page> {
    return this.http
      .get<any>(`${GALERY_API}/galery/users/${user}/?page=${page}&size=${size}`,this.options)
      .map(res => res)
  }

  cadastrarUsuario(user: Usuarios): Observable<any> {
    return this.http.post(`${GALERY_API}/galery/user`, user, this.options)
      .map(response => response)

  }
  editarUsuario(user: Usuarios): Observable<any> {

    return this.http.put(`${GALERY_API}/galery/user`, user, this.options)
      .map(response => response)
  }

  deletarUsuario(id): Observable<any> {
    return this.http.delete(`${GALERY_API}/galery/user/${id}`)
      .map(response => response)
  }

}
