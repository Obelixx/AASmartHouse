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
        this.loginEvents = new core_1.EventEmitter();
        this.toStoreToken = true;
        this.firstAndLastName = '';
        this._isLoggedIn = false;
        if (this.localStorageService.hasItem(this.settings.tokenKeyName)) {
            this.token = this.localStorageService.getItem(this.settings.tokenKeyName);
            this.login(this.token);
        }
    }
    Object.defineProperty(UserService.prototype, "userIsLoggedIn", {
        get: function () {
            return this._isLoggedIn;
        },
        set: function (value) {
            this._isLoggedIn = value;
            this.loginEvents.emit(this._isLoggedIn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "storageToken", {
        get: function () {
            return this.localStorageService.getItem(this.settings.tokenKeyName);
        },
        set: function (token) {
            this.localStorageService.setItem(this.settings.tokenKeyName, token);
        },
        enumerable: true,
        configurable: true
    });
    UserService.prototype.register = function (email, password, confirmPassword, firstname, lastname) {
        var body = JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword, firstname: firstname, lastname: lastname });
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.settings.api.Url + this.settings.register.Url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UserService.prototype.getToken = function (user) {
        var _this = this;
        var body = "username=" + user.email + "&password=" + user.password + "&grant_type=password";
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_2.RequestOptions({ headers: headers });
        var request = this.http.post(this.settings.api.Url + this.settings.token.Url, body, options)
            .map(function (response, index) {
            var result = _this.extractData(response);
            _this.login(result.access_token);
            return result;
        });
        //.catch(this.handleError);
        return request;
    };
    UserService.prototype.getUserData = function (token) {
        var _this = this;
        if (token === void 0) { token = this.token; }
        var headers = this.authorizationHeaders(token);
        var request = this.http.get(this.settings.api.Url + this.settings.user.Url, { headers: headers })
            .map(function (response, index) {
            _this.userIsLoggedIn = true;
            return _this.extractData(response);
        })
            .catch(function (error) {
            _this.userIsLoggedIn = false;
            return _this.handleError(error);
        });
        return request;
    };
    UserService.prototype.setUserData = function (stringifyedUserData, token) {
        var _this = this;
        if (token === void 0) { token = this.token; }
        var headers = this.authorizationHeaders(token);
        var request = this.http.post(this.settings.api.Url + this.settings.user.Url, stringifyedUserData, { headers: headers })
            .map(function (response, index) {
            _this.userIsLoggedIn = true;
            _this.extractData(response);
        });
        return request;
    };
    UserService.prototype.login = function (token) {
        var _this = this;
        if (this.toStoreToken) {
            this.localStorageService.setItem(app_settings_1.AppSettings.UserServiceSettings.tokenKeyName, token);
        }
        this.token = token;
        this.userIsLoggedIn = true;
        this.getUserData(this.token)
            .subscribe(function (response) {
            _this.firstAndLastName = response.FirstName + ' ' + response.LastName;
        });
    };
    UserService.prototype.logout = function () {
        this.firstAndLastName = "";
        this.localStorageService.clearItem(this.settings.tokenKeyName);
        this.userIsLoggedIn = false;
    };
    UserService.prototype.authorizationHeaders = function (token) {
        var headers = new http_2.Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-Type', 'application/json');
        return headers;
    };
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    UserService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText :
                error.error_description ? error.error_description : 'Server error';
        console.error(errMsg); // log to console instead
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