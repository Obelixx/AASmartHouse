import { Component } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { UserService } from '../../services/user.service';

import { AppSettings } from '../../app.settings';

@Component({
    selector: 'loginScreen',
    templateUrl: './app/components/screens/templates/loginScreen.component.template.html'
})
export class LoginScreenComponent {
    public userEmail = '';
    public userPassword = '';
    public errorMsg = '';
    public successMsg = '';

    constructor(
        private userService: UserService
    ) { }

    login() {
        this.userService.getToken(this.userEmail,this.userPassword)
            .catch((err, caught) => {
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