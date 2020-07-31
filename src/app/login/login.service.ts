import { Login } from './login.model';
import { GALERY_API } from './../app.api';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }

    login(name: string, pass: string): Observable<Login> {
        return this.http.post<Login>(`${GALERY_API}/galery/login`, {
            name: name, pass: pass
        })

    }

}
