import { Component } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { UserService } from '../../services/user.service';

import { AppSettings } from '../../app.settings';

@Component({
    selector: 'registerScreen',
    templateUrl: './app/components/screens/templates/registerScreen.component.template.html'
})
export class RegisterScreenComponent {
    public userEmail = '';
    public userPassword = '';
    public userConfirmPassword = '';
    public firstName = '';
    public lastName = '';
    public errorMsg = '';
    public successMsg = '';

    constructor(
        private userService: UserService
    ) { }

    register() {
        this.userService.register(this.userEmail,this.userPassword,this.userConfirmPassword,this.firstName,this.lastName)
            .catch((err, caught) => {
                try {
                    let error = JSON.parse(err._body);
                    this.errorMsg = error.error_description || error.Message;
                    if (error.ModelState) {
                        for (var propertyName in error.ModelState) {
                            this.errorMsg += ' ' + error.ModelState[propertyName][0];
                        }
                    }
                }
                catch (err) {
                    this.errorMsg = 'Bad network connection or the server Api is down!';
                }
                finally {
                    return Observable.throw('RegisterScreenComponent, register() - failed!');
                }
            })
            .subscribe(_no_res_expected => {
                this.errorMsg = '';
                this.successMsg = 'User ' + this.userEmail + ' registered successfully!';
            })
    }
}