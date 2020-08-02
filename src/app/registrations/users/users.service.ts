import { GALERY_API } from './../../app.api';

import { Injectable } from '@angular/core';
import { Usuarios } from './user.model';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()

export class UsersService {

  constructor(private http: Http) { }

  usuario(): Observable<Usuarios[]> {
    return this.http.get(`${GALERY_API}/galery/users`)
      .map(response => response.json())
  }
}
