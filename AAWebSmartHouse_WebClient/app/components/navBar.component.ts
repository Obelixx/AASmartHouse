import { Component } from '@angular/core';

import { LoginScreenComponent } from './screens/loginScreen.component';
import { RegisterScreenComponent } from './screens/registerScreen.component';
import { UserDataScreenComponent } from './screens/userDataScreen.component';
import { HousesScreenComponent } from './screens/housesScreen.component';

import { UserService } from '../services/user.service';
import { ScreenService } from '../services/screen.service';

@Component({
    selector: 'navBar',
    templateUrl: './app/components/templates/navBar.component.template.html'
})
export class NavBarComponent {
    constructor(
        private userService: UserService,
        private screenService: ScreenService
    ) {
    }

    loginClicked() {
        this.screenService.toScreen(LoginScreenComponent);
    }

    logoutClicked() {
        this.userService.logout();
        this.screenService.toScreen(LoginScreenComponent);
    }
    
    registerClicked(){
        this.screenService.toScreen(RegisterScreenComponent);
    }

    displayUserDataScreen() {
        if (this.userService.userIsLoggedIn) {
            this.screenService.toScreen(UserDataScreenComponent);
        }
    }

    housesClicked(){
        if (this.userService.userIsLoggedIn) {
            this.screenService.toScreen(HousesScreenComponent);
        }
    }
}