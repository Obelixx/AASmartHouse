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
require('../operators/rxjs-operators');
var navBar_component_1 = require('../components/navBar.component');
var screen_component_1 = require('../components/screen.component');
var loginScreen_component_1 = require('./loginScreen.component');
var user_service_1 = require('../services/user.service');
var localStorage_service_1 = require('../services/localStorage.service');
var screen_service_1 = require('../services/screen.service');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app/components/templates/app.component.template.html',
            directives: [navBar_component_1.NavBarComponent, screen_component_1.ScreenComponent, loginScreen_component_1.LoginScreenComponent],
            providers: [user_service_1.UserService, localStorage_service_1.LocalStorageService, screen_service_1.ScreenService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map