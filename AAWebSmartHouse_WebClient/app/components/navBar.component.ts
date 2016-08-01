import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { ScreenModel } from '../models/screen.model';

import { LoginScreenComponent } from './loginScreen.component';

import { UserService } from '../services/user.service';
import { ScreenService } from '../services/screen.service';
import { LocalStorageService } from '../services/localStorage.service';

@Component({
    selector: 'navBar',
    templateUrl: './app/components/templates/navBar.component.template.html'
})
export class NavBarComponent {
    token = '';   

    constructor(
        private userService: UserService,
        private localStorage: LocalStorageService,
        private screenService: ScreenService
    ) {
        

        // if (localStorage.hasItem(TokenKeyName)) {
        //     let token = localStorage.getItem(TokenKeyName);

        //     userService.getUserData(this.token)
        //         .map(this.extractData)
        //         .catch((err: any, cought: Observable<any>) => {
        //             this.isLoggedIn = false;
        //             return this.handleError(err);
        //         })
        //         .subscribe(res => {
        //             this.spanText = JSON.stringify(res);
        //             if (res.userName)
        //             { }
        //         })
        // };
    }

    loginClicked() {
        this.screenService.addScreen(new ScreenModel(LoginScreenComponent));
    }

    logoutClicked() {
        this.userService.logout();
    }
}