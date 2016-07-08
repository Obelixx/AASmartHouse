"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var user_service_1 = require('../services/user.service');
var localStorage_service_1 = require('../services/localStorage.service');
var LoginComponent = (function () {
    function LoginComponent(userService, localStorage) {
        this.userService = userService;
        this.localStorage = localStorage;
        this.username = 'stranger';
        this.loginButtonText = 'Login';
        this.loginButtonClass = 'btn-primary';
        this.isValidTokenButtonText = "isValid?";
        this.isValidTokenButtonClass = 'btn-warning';
        this.spanText = '';
        this.token = '';
        this.isLoggedIn = false;
        var TokenKeyName = "Token";
        // if (localStorage.hasItem(TokenKeyName)) {
        //     let token = localStorage.getItem(TokenKeyName);
        //     userService.isTokenValid(token)
        //         .subscribe(res => {
        //             console.log(JSON.stringify(res));
        //         })
        // };
    }
    LoginComponent.prototype.getTokenClicked = function () {
        var _this = this;
        this.userService.getToken('mail@mail.bg', '123456a')
            .subscribe(function (res) {
            _this.username = res.userName;
            console.log(res.access_token);
            _this.token = res.access_token;
        });
    };
    LoginComponent.prototype.isValidTokenClicked = function () {
        var _this = this;
        this.userService.isTokenValid(this.token)
            .subscribe(function (res) {
            console.log(" ISVALID REZ: " + res);
            console.log(" ISVALID REZ string : " + JSON.stringify(res));
            _this.spanText = JSON.stringify(res);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './app/components/templates/login.component.template.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, localStorage_service_1.LocalStorageService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map