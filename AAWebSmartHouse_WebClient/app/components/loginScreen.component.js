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
var Observable_1 = require('rxjs/Observable');
var user_model_1 = require('../models/user.model');
var user_service_1 = require('../services/user.service');
var localStorage_service_1 = require('../services/localStorage.service');
var app_settings_1 = require('../app.settings');
var LoginScreenComponent = (function () {
    function LoginScreenComponent(userService, localStorageService) {
        this.userService = userService;
        this.localStorageService = localStorageService;
        this.user = new user_model_1.UserModel("", "");
        this.userName = "foo";
        this.userPassword = "bar";
        this.errorMsg = 'inital';
    }
    LoginScreenComponent.prototype.login = function () {
        var _this = this;
        this.userService.getToken(this.user.email, this.user.password)
            .catch(function (err, cought) {
            var error = JSON.parse(err._body);
            _this.errorMsg = error.error_description;
            return Observable_1.Observable.throw("");
        })
            .subscribe(function (res) {
            _this.localStorageService.setItem(app_settings_1.AppSettings.UserServiceSettings.tokenKeyName, res.access_token);
            console.log("res: " + JSON.stringify(res));
            console.log("Username: " + res.userName);
            console.log("Token: " + res.access_token);
        });
    };
    LoginScreenComponent = __decorate([
        core_1.Component({
            selector: 'loginScreen',
            templateUrl: './app/components/templates/loginScreen.component.template.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, localStorage_service_1.LocalStorageService])
    ], LoginScreenComponent);
    return LoginScreenComponent;
}());
exports.LoginScreenComponent = LoginScreenComponent;
//# sourceMappingURL=loginScreen.component.js.map