import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/localStorage.service';


@Component({
    selector: 'login',
    templateUrl: './app/components/templates/login.component.template.html'
})
export class LoginComponent {
    username = 'stranger';
    loginButtonText = 'Login';
    loginButtonClass = 'btn-primary';
    isValidTokenButtonText = "isValid?";
    isValidTokenButtonClass = 'btn-warning';
    spanText = '';
    token = '';
    isLoggedIn = false;

    constructor(private userService: UserService, private localStorage: LocalStorageService) {
        const TokenKeyName = "Token";

        // if (localStorage.hasItem(TokenKeyName)) {
        //     let token = localStorage.getItem(TokenKeyName);

        //     userService.isTokenValid(token)
        //         .subscribe(res => {
        //             console.log(JSON.stringify(res));
        //         })

        // };
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

    isValidTokenClicked(){
        this.userService.isTokenValid(this.token)
                .subscribe(res => {
                    console.log(" ISVALID REZ: " + res);
                    console.log(" ISVALID REZ string : " +JSON.stringify(res));
                    this.spanText = JSON.stringify(res);
                })
    }
}