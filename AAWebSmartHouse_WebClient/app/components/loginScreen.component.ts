import { Component } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
    selector: 'loginScreen',
    templateUrl: './app/components/templates/loginScreen.component.template.html'
})
export class LoginScreenComponent {
    public user = new UserModel('', '');
    public errorMsg = '';

    constructor(private userService: UserService) { }

    login() {
        if (!this._service.login(this.user)) {
            this.errorMsg = 'Failed to login';
        }
    }
}