import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { ScreenModel } from '../models/screen.model';

import { LoginScreenComponent } from './loginScreen.component';
import { UserDataScreenComponent } from './userDataScreen.component';

import { UserService } from '../services/user.service';
import { ScreenService } from '../services/screen.service';

@Component({
    selector: 'navBar',
    templateUrl: './app/components/templates/navBar.component.template.html'
})
export class NavBarComponent { 

// We need userService because the template is using data from it!
    constructor(
        private userService: UserService,
        private screenService: ScreenService
    ) {
    }

    loginClicked() {
        this.screenService.addScreen(new ScreenModel(LoginScreenComponent));
    }

    logoutClicked() {
        this.userService.logout();
    }

    displayUserDataScreen(){
        this.screenService.addScreen(new ScreenModel(UserDataScreenComponent));
    }
}