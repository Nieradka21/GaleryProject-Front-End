import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopUpComponent } from './pop-up.component';
import { Usuarios } from '../user.model';
import { UsersComponent } from '../users.component';


@Injectable()
export class PopUpService {
    usr:UsersComponent
    constructor(private modalService: NgbModal
        ) { }

    public confirm(
        title: string,
        message: string,
        btnOkText: string = 'OK',
        btnCancelText: string = 'Cancel',
        dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
        const modalRef = this.modalService.open(PopUpComponent, { size: dialogSize });
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.btnOkText = btnOkText;
        modalRef.componentInstance.btnCancelText = btnCancelText;


        return modalRef.result;
  
    }

    

}
