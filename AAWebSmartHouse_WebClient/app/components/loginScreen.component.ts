import { Component } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { UserModel } from '../models/user.model';

import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/localStorage.service';

import { AppSettings } from '../app.settings';

@Component({
    selector: 'loginScreen',
    templateUrl: './app/components/templates/loginScreen.component.template.html'
})
export class LoginScreenComponent {
    public user: UserModel = new UserModel("", "");
    public userName = "foo";
    public userPassword = "bar";
    public errorMsg = 'inital';

    constructor(
        private userService: UserService,
        private localStorageService: LocalStorageService
    ) { }

    login() {
        this.userService.getToken(this.user.email, this.user.password)
            .catch((err, cought) => {
                let error = JSON.parse(err._body);
                this.errorMsg = error.error_description;
                return Observable.throw("");
            })
            .subscribe(res => {
                this.localStorageService.setItem(AppSettings.UserServiceSettings.tokenKeyName, res.access_token);
                console.log("res: " + JSON.stringify(res));
                console.log("Username: " + res.userName);
                console.log("Token: " + res.access_token);
            })
    }
}