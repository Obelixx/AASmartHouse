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
var Observable_1 = require('rxjs/Observable');
var user_service_1 = require('./user.service');
var house_service_1 = require('./house.service');
var app_settings_1 = require('../app.settings');
var RoomService = (function () {
    function RoomService(userService, houseService, http) {
        var _this = this;
        this.userService = userService;
        this.houseService = houseService;
        this.http = http;
        this.roomIds = [];
        if (userService.userIsLoggedIn) {
            this.token = this.userService.token;
            this.roomIds = this.houseService.selectedHouse.RoomIds;
        }
        else {
            this.userService.loginEvents.subscribe(function (onLogin) {
                if (onLogin) {
                    _this.token = _this.userService.token;
                    _this.roomIds = _this.houseService.selectedHouse.RoomIds;
                }
                else {
                    _this.token = '';
                    _this.roomIds = [];
                }
            });
        }
    }
    Object.defineProperty(RoomService.prototype, "pagesCount", {
        get: function () {
            var pagesCount = this.roomIds.length / app_settings_1.AppSettings.ApiSettings.elementsPerPage;
            if (this.roomIds.length % app_settings_1.AppSettings.ApiSettings.elementsPerPage > 0) {
                pagesCount++;
            }
            console.log("pages count: " + pagesCount);
            return pagesCount;
        },
        enumerable: true,
        configurable: true
    });
    RoomService.prototype.getRooms = function (houseId, page, token) {
        if (token === void 0) { token = this.token; }
        var url = app_settings_1.AppSettings.ApiSettings.api.Url + app_settings_1.AppSettings.ApiSettings.rooms.Url;
        var options = this.authorizationHeaders(token);
        url += '?page=';
        url += page;
        url += '&pageSize=';
        url += app_settings_1.AppSettings.ApiSettings.elementsPerPage;
        url += '&houseId=';
        url += houseId;
        return this.authorizedGetRequest(url, options);
    };
    RoomService.prototype.authorizedGetRequest = function (url, headers) {
        var _this = this;
        if (headers === void 0) { headers = this.authorizationHeaders(this.token); }
        var request = this.http.get(url, headers)
            .map(function (response, index) {
            return _this.extractData(response);
        })
            .catch(function (error) {
            return _this.handleError(error);
        });
        return request;
    };
    RoomService.prototype.authorizationHeaders = function (token) {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return options;
    };
    RoomService.prototype.extractData = function (res) {
        var body;
        try {
            body = res.json(); // This throws on OK(200) response with empty body.
            console.log(body);
        }
        catch (err) {
        }
        return body;
    };
    RoomService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText :
                error.error_description ? error.error_description : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    RoomService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [user_service_1.UserService, house_service_1.HouseService, http_1.Http])
    ], RoomService);
    return RoomService;
}());
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map