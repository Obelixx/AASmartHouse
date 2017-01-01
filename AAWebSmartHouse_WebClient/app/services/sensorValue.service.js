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
var sensor_service_1 = require('./sensor.service');
var app_settings_1 = require('../app.settings');
var app_settings_2 = require('../app.settings');
var SensorValueService = (function () {
    function SensorValueService(userService, sensorService, http) {
        var _this = this;
        this.userService = userService;
        this.sensorService = sensorService;
        this.http = http;
        this.sensorDataIdsByHours = [];
        if (userService.userIsLoggedIn) {
            this.token = this.userService.token;
            this.sensorDataIdsByHours = this.sensorService.selectedSensor.SensorValuesIds; //.SensorDataIdsByHours;
        }
        else {
            this.userService.loginEvents.subscribe(function (onLogin) {
                if (onLogin) {
                    _this.token = _this.userService.token;
                    _this.sensorDataIdsByHours = _this.sensorService.selectedSensor.SensorValuesIds;
                }
                else {
                    _this.token = '';
                    _this.sensorDataIdsByHours = [];
                }
            });
        }
    }
    SensorValueService.prototype.pagesCount = function (aggregationType) {
        var pagesCount = this.sensorDataIdsByHours.length / app_settings_1.AppSettings.ApiSettings.elementsPerPage | 0;
        if (this.sensorDataIdsByHours.length % app_settings_1.AppSettings.ApiSettings.elementsPerPage > 0) {
            pagesCount += 1;
        }
        console.log(pagesCount);
        return pagesCount;
    };
    //// GET api/SensorValue?sensorId=sensorId&aggregationType=ByHour/ByDay/ByWeek/ByMonth&page=1&pageSize=10
    //aggregationType=ByHour/ByDay/ByWeek/ByMonth
    SensorValueService.prototype.getSensorValues = function (sensorId, aggregationType, page, token) {
        if (aggregationType === void 0) { aggregationType = app_settings_2.SensorDataAggregationType.ByHour; }
        if (token === void 0) { token = this.token; }
        var url = app_settings_1.AppSettings.ApiSettings.api.Url + app_settings_1.AppSettings.ApiSettings.sensorValues.Url;
        var options = this.authorizationHeaders(token);
        url += '?page=';
        url += page;
        url += '&pageSize=';
        url += app_settings_1.AppSettings.ApiSettings.elementsPerPage;
        url += '&sensorId=';
        url += sensorId;
        url += '&aggregationType=';
        url += aggregationType;
        return this.authorizedGetRequest(url, options);
    };
    SensorValueService.prototype.authorizedGetRequest = function (url, headers) {
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
    SensorValueService.prototype.authorizationHeaders = function (token) {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return options;
    };
    SensorValueService.prototype.extractData = function (res) {
        var body;
        try {
            body = res.json(); // This throws on OK(200) response with empty body.
        }
        catch (err) {
        }
        return body;
    };
    SensorValueService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText :
                error.error_description ? error.error_description : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    SensorValueService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [user_service_1.UserService, sensor_service_1.SensorService, http_1.Http])
    ], SensorValueService);
    return SensorValueService;
}());
exports.SensorValueService = SensorValueService;
//# sourceMappingURL=sensorValue.service.js.map