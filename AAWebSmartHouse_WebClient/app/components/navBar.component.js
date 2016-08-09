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
var loginScreen_component_1 = require('./screens/loginScreen.component');
var userDataScreen_component_1 = require('./screens/userDataScreen.component');
var user_service_1 = require('../services/user.service');
var screen_service_1 = require('../services/screen.service');
var NavBarComponent = (function () {
    function NavBarComponent(userService, // We need userService because the template is using data from it!
        screenService) {
        this.userService = userService;
        this.screenService = screenService;
    }
    NavBarComponent.prototype.loginClicked = function () {
        this.screenService.addScreen(loginScreen_component_1.LoginScreenComponent);
    };
    NavBarComponent.prototype.logoutClicked = function () {
        this.userService.logout();
    };
    NavBarComponent.prototype.displayUserDataScreen = function () {
        if (this.userService.userIsLoggedIn) {
            this.screenService.addScreen(userDataScreen_component_1.UserDataScreenComponent);
        }
    };
    NavBarComponent = __decorate([
        core_1.Component({
            selector: 'navBar',
            templateUrl: './app/components/templates/navBar.component.template.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, screen_service_1.ScreenService])
    ], NavBarComponent);
    return NavBarComponent;
}());
exports.NavBarComponent = NavBarComponent;
//# sourceMappingURL=navBar.component.js.map