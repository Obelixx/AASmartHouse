import { Component } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { UserModel } from '../../models/user.model';

import { UserService } from '../../services/user.service';

import { AppSettings } from '../../app.settings';

@Component({
    selector: 'loginScreen',
    templateUrl: './app/components/screens/templates/loginScreen.component.template.html'
})
export class LoginScreenComponent {
    public user: UserModel = new UserModel("", "");
    public errorMsg = '';
    public successMsg = '';

    constructor(
        private userService: UserService
    ) { }

    login() {
        this.userService.getToken(new UserModel(this.user.email, this.user.password))
            .catch((err, cought) => {
                try {
                    let error = JSON.parse(err._body);
                    this.errorMsg = error.error_description || error.Message;
                }
                catch (err) {
                    this.errorMsg = 'Bad network connection or the server Api is down!';
                }
                finally {
                    return Observable.throw('LoginScreenComponent, login() - failed!');
                }
            })
            .subscribe(res => {
                this.errorMsg = '';
                this.successMsg = 'User "' + res.userName + '" is logged in!';
            })
    }
}