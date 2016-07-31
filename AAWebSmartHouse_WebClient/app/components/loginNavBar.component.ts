import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { ScreenModel } from '../models/screen.model';

import { UserService } from '../services/user.service';
import { ScreenService } from '../services/screen.service';
import { LocalStorageService } from '../services/localStorage.service';

import { LoginScreenComponent } from './loginScreen.component';

@Component({
    selector: 'loginNavBar',
    templateUrl: './app/components/templates/loginNavBar.component.template.html',
    directives: [LoginScreenComponent]
})
export class LoginNavBarComponent {
    username = 'stranger';
    spanText = '';
    token = '';
    

    constructor(
        private userService: UserService,
        private localStorage: LocalStorageService,
        private screenService: ScreenService
    ) {
        const TokenKeyName = "Token";

        if (localStorage.hasItem(TokenKeyName)) {
            let token = localStorage.getItem(TokenKeyName);

            userService.getUserData(this.token)
                .map(this.extractData)
                .catch((err: any, cought: Observable<any>) => {
                    this.isLoggedIn = false;
                    return this.handleError(err);
                })
                .subscribe(res => {
                    this.spanText = JSON.stringify(res);
                    if (res.userName)
                    { }
                })
        };
    }

    loginClicked() {
        this.screenService.addScreen(new ScreenModel(LoginScreenComponent));
    }

    getTokenClicked() {
        this.userService.getToken('mail@mail.bg', '123456a')
            //this.userService.getToken('admin', 'adminPassword')
            .subscribe(res => {
                this.username = res.userName;
                console.log(res.access_token);
                this.token = res.access_token;
            })

    }

    isValidTokenClicked() {
        this.userService.getUserData(this.token)
            .subscribe(res => {
                this.spanText = JSON.stringify(res);
            })
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        console.error("!!ERROR!!: " + JSON.stringify(error));
        return Observable.throw(errMsg);
    }
}