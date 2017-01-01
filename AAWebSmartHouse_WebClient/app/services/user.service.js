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
var user_model_1 = require('../models/user.model');
var localStorage_service_1 = require('./localStorage.service');
var app_settings_1 = require('../app.settings');
var UserService = (function () {
    function UserService(http, localStorageService) {
        this.http = http;
        this.localStorageService = localStorageService;
        this.currentUser = new user_model_1.UserModel('', '', 'mail', 'username', 'id', 'pn', [''], ['']);
        this.apiSettings = app_settings_1.AppSettings.ApiSettings;
        this.loginEvents = new core_1.EventEmitter();
        this.toStoreToken = true;
        this._isLoggedIn = false;
        if (this.localStorageService.hasItem(this.apiSettings.tokenKeyName)) {
            this.token = this.localStorageService.getItem(this.apiSettings.tokenKeyName);
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
            return this.localStorageService.getItem(this.apiSettings.tokenKeyName);
        },
        set: function (token) {
            this.localStorageService.setItem(this.apiSettings.tokenKeyName, token);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "userHousesIds", {
        get: function () {
            return this.currentUser.HousesIds;
        },
        enumerable: true,
        configurable: true
    });
    // TODO: not used so far..
    UserService.prototype.register = function (email, password, confirmPassword, firstName, lastName) {
        var body = JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword, firstName: firstName, lastName: lastName });
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.apiSettings.api.Url + this.apiSettings.register.Url, body, options)
            .map(this.extractData);
        //.catch(this.handleError);
    };
    UserService.prototype.getToken = function (userEmail, userPassword) {
        var body = "username=" + userEmail + "&password=" + userPassword + "&grant_type=password";
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_2.RequestOptions({ headers: headers });
        return this.authorizedPostRequestWithData(this.apiSettings.api.Url + this.apiSettings.token.Url, body, options);
    };
    UserService.prototype.getUserData = function (token) {
        if (token === void 0) { token = this.token; }
        var url = this.apiSettings.api.Url + this.apiSettings.user.Url;
        var options = this.authorizationHeaders(token);
        return this.authorizedGetRequest(url, options);
    };
    UserService.prototype.setUserData = function (stringifiedUserData, token) {
        if (token === void 0) { token = this.token; }
        var url = this.apiSettings.api.Url + this.apiSettings.user.Url;
        var options = this.authorizationHeaders(token);
        return this.authorizedPostRequestWithData(url, stringifiedUserData, options);
    };
    UserService.prototype.changePassword = function (stringifiedUserData, token) {
        if (token === void 0) { token = this.token; }
        var url = this.apiSettings.api.Url + this.apiSettings.account.ChangePasswordUrl;
        var options = this.authorizationHeaders(token);
        return this.authorizedPostRequestWithData(url, stringifiedUserData, options);
    };
    UserService.prototype.getGroups = function (groupIds, token) {
        if (token === void 0) { token = this.token; }
        var url = this.apiSettings.api.Url + this.apiSettings.groups.Url;
        url += '?';
        groupIds.forEach(function (groupId) {
            url += 'groupIds=' + groupId + '&';
        });
        var options = this.authorizationHeaders(token);
        return this.authorizedGetRequest(url, options);
    };
    UserService.prototype.authorizedGetRequest = function (url, headers) {
        var _this = this;
        if (headers === void 0) { headers = this.authorizationHeaders(this.token); }
        var request = this.http.get(url, headers)
            .map(function (response, index) {
            _this.userIsLoggedIn = true;
            return _this.extractData(response);
        })
            .catch(function (error) {
            _this.logout();
            return _this.handleError(error);
        });
        return request;
    };
    UserService.prototype.authorizedPostRequestWithData = function (url, stringifiedUserData, options) {
        var _this = this;
        if (options === void 0) { options = this.authorizationHeaders(this.token); }
        var request = this.http.post(url, stringifiedUserData, options)
            .map(function (response, index) {
            _this.userIsLoggedIn = true;
            return _this.extractData(response);
        });
        return request;
    };
    UserService.prototype.login = function (token) {
        var _this = this;
        console.log("logging in ..");
        if (this.toStoreToken) {
            this.localStorageService.setItem(app_settings_1.AppSettings.ApiSettings.tokenKeyName, token);
        }
        this.token = token;
        this.userIsLoggedIn = true;
        this.getUserData(this.token)
            .subscribe(function (response) {
            _this.currentUser = response;
        });
    };
    UserService.prototype.logout = function () {
        console.log("logging out ..");
        this.currentUser = new user_model_1.UserModel('', '', 'mail', 'username', 'id', 'pn', [''], ['']);
        ;
        this.localStorageService.clearItem(this.apiSettings.tokenKeyName);
        this.token = '';
        this.userIsLoggedIn = false;
    };
    UserService.prototype.authorizationHeaders = function (token) {
        var headers = new http_2.Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-Type', 'application/json');
        var options = new http_2.RequestOptions({ headers: headers });
        return options;
    };
    UserService.prototype.extractData = function (res) {
        var body;
        try {
            body = res.json(); // This throws on OK(200) response with empty body.
            if (body.access_token) {
                this.login(body.access_token);
            }
            if (body.HousesIds) {
                this.currentUser.HousesIds = body.HousesIds;
            }
        }
        catch (err) {
        }
        return body;
    };
    UserService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText :
                error.error_description ? error.error_description : 'Server error';
        console.error(errMsg);
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