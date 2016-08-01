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
var screen_model_1 = require('../models/screen.model');
var loginScreen_component_1 = require('./loginScreen.component');
var user_service_1 = require('../services/user.service');
var screen_service_1 = require('../services/screen.service');
var localStorage_service_1 = require('../services/localStorage.service');
var NavBarComponent = (function () {
    function NavBarComponent(userService, localStorage, screenService) {
        // if (localStorage.hasItem(TokenKeyName)) {
        //     let token = localStorage.getItem(TokenKeyName);
        this.userService = userService;
        this.localStorage = localStorage;
        this.screenService = screenService;
        this.token = '';
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
    NavBarComponent.prototype.loginClicked = function () {
        this.screenService.addScreen(new screen_model_1.ScreenModel(loginScreen_component_1.LoginScreenComponent));
    };
    NavBarComponent.prototype.logoutClicked = function () {
        this.userService.logout();
    };
    NavBarComponent = __decorate([
        core_1.Component({
            selector: 'navBar',
            templateUrl: './app/components/templates/navBar.component.template.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, localStorage_service_1.LocalStorageService, screen_service_1.ScreenService])
    ], NavBarComponent);
    return NavBarComponent;
}());
exports.NavBarComponent = NavBarComponent;
//# sourceMappingURL=navBar.component.js.map