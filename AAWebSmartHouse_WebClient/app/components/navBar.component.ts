import { Component } from '@angular/core';

import { LoginScreenComponent } from './screens/loginScreen.component';
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
        private userService: UserService, // We need userService because the template is using data from it!
        private screenService: ScreenService
    ) {
    }

    loginClicked() {
        this.screenService.addScreen(LoginScreenComponent);
    }

    logoutClicked() {
        this.userService.logout();
    }

    displayUserDataScreen() {
        if (this.userService.userIsLoggedIn) {
            this.screenService.addScreen(UserDataScreenComponent);
        }
    }

    housesClicked(){
        if (this.userService.userIsLoggedIn) {
            this.screenService.addScreen(HousesScreenComponent);
        }
    }
}