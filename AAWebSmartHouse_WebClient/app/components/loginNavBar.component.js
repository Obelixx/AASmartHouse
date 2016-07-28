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
var Observable_1 = require('rxjs/Observable');
var localStorage_service_1 = require('../services/localStorage.service');
var LoginNavBarComponent = (function () {
    function LoginNavBarComponent(userService, localStorage) {
        var _this = this;
        this.userService = userService;
        this.localStorage = localStorage;
        this.username = 'stranger';
        this.spanText = '';
        this.token = '';
        this.isLoggedIn = false;
        var TokenKeyName = "Token";
        if (localStorage.hasItem(TokenKeyName)) {
            var token = localStorage.getItem(TokenKeyName);
            userService.getUserData(this.token)
                .map(this.extractData)
                .catch(function (err, cought) {
                _this.isLoggedIn = false;
                return _this.handleError(err);
            })
                .subscribe(function (res) {
                _this.spanText = JSON.stringify(res);
                if (res.userName) { }
            });
        }
        ;
    }
    LoginNavBarComponent.prototype.getTokenClicked = function () {
        var _this = this;
        this.userService.getToken('mail@mail.bg', '123456a')
            .subscribe(function (res) {
            _this.username = res.userName;
            console.log(res.access_token);
            _this.token = res.access_token;
        });
    };
    LoginNavBarComponent.prototype.isValidTokenClicked = function () {
        var _this = this;
        this.userService.getUserData(this.token)
            .subscribe(function (res) {
            _this.spanText = JSON.stringify(res);
        });
    };
    LoginNavBarComponent.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    LoginNavBarComponent.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        console.error("!!ERROR!!: " + JSON.stringify(error));
        return Observable_1.Observable.throw(errMsg);
    };
    LoginNavBarComponent = __decorate([
        core_1.Component({
            selector: 'loginNavBar',
            templateUrl: './app/components/templates/loginNavBar.component.template.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, localStorage_service_1.LocalStorageService])
    ], LoginNavBarComponent);
    return LoginNavBarComponent;
}());
exports.LoginNavBarComponent = LoginNavBarComponent;
//# sourceMappingURL=loginNavBar.component.js.map