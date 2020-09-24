import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Usuarios } from 'src/app/models/user.model';
import { UsersService } from '../userService/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
    user: Usuarios;
    constructor(
        private router: Router,
        private userService: UsersService
    ) {
        this.userService.isLogged().subscribe(
            res => {
                console.log(res);
            });
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        
        
        if (localStorage['token'] != null) {
                        return true
        } else {
            this.router.navigate(['/login']);
        }


    }
}