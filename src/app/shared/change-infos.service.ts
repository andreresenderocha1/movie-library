import { Subject } from 'rxjs';

export class ChangeInfosService{
    userEmailEmitter = new Subject<string>();
    createAccountEmitter = new Subject<void>();
    backToLoginEmmiter = new Subject<void>();
   
}