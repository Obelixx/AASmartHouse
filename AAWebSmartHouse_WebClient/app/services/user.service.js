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
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var localStorage_service_1 = require('./localStorage.service');
var app_settings_1 = require('../app.settings');
var UserService = (function () {
    function UserService(http, localStorageService) {
        this.http = http;
        this.localStorageService = localStorageService;
        this.settings = app_settings_1.AppSettings.UserServiceSettings;
        this.isLoggedIn = false;
    }
    UserService.prototype.register = function (email, password, confirmPassword, firstname, lastname) {
        var body = JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword, firstname: firstname, lastname: lastname });
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.settings.apiUrl + this.settings.registerUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UserService.prototype.getToken = function (email, password) {
        var body = "username=" + email + "&password=" + password + "&grant_type=password";
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.settings.apiUrl + this.settings.tokenUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UserService.prototype.getUserData = function (token) {
        var headers = new http_2.Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        var options = new http_2.RequestOptions({ headers: headers });
        var request = this.http.get(this.settings.apiUrl + this.settings.userUrl, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
        return request;
    };
    UserService.prototype.isTokenAvailable = function () {
        return this.localStorageService.hasItem(this.settings.tokenKeyName);
    };
    UserService.prototype.isUserLoggedIn = function () {
        var _this = this;
        if (this.isTokenAvailable()) {
            this.getUserData(this.token)
                .subscribe(function (res) {
                _this.spanText = JSON.stringify(res);
            });
        }
        else {
            return false;
        }
    };
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    UserService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        console.error("!!ERROR!!: " + JSON.stringify(error));
        return Observable_1.Observable.throw(errMsg);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, localStorage_service_1.LocalStorageService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map