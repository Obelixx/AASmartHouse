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
var sensorValue_model_1 = require('../../models/sensorValue.model');
var sensorValue_service_1 = require('../../services/sensorValue.service');
var sensor_service_1 = require('../../services/sensor.service');
var screen_service_1 = require('../../services/screen.service');
var app_settings_1 = require('../../app.settings');
var SensorValuesScreenComponent = (function () {
    function SensorValuesScreenComponent(sensorValueService, sensorService, screenService) {
        this.sensorValueService = sensorValueService;
        this.sensorService = sensorService;
        this.screenService = screenService;
        this.sensorData = [new sensorValue_model_1.SensorValueModel(1, 1, 1, "Temp in kitchen")];
        this.message = '';
        this.sensorDataAggregationType = app_settings_1.SensorDataAggregationType.ByHour;
        this.page = 1;
        this.pages = this.sensorValueService.pagesCount(this.sensorDataAggregationType);
        this.sensorData.splice(0);
        this.getSensorValues(this.page);
    }
    SensorValuesScreenComponent.prototype.getSensorValues = function (page) {
        var _this = this;
        this.sensorData.splice(0);
        this.sensorValueService.getSensorValues(this.sensorService.selectedSensor.SensorId, this.sensorDataAggregationType, page)
            .subscribe(function (res) {
            console.log(res);
            if (Array.isArray(res)) {
                _this.sensorData = res;
                _this.message = 'Success';
                if (_this.sensorData.length == 0) {
                    _this.message += '; But you have no data for this sensor!';
                }
            }
            else {
                _this.message = res;
            }
        });
    };
    SensorValuesScreenComponent.prototype.previousClicked = function () {
        if (this.page > 1) {
            this.page--;
            this.getSensorValues(this.page);
        }
    };
    SensorValuesScreenComponent.prototype.nextClicked = function () {
        if (this.page < this.sensorValueService.pagesCount(this.sensorDataAggregationType)) {
            this.page++;
            this.getSensorValues(this.page);
        }
    };
    SensorValuesScreenComponent = __decorate([
        core_1.Component({
            selector: 'sensorValuesScreen',
            templateUrl: './app/components/screens/templates/sensorValuesScreen.component.template.html'
        }), 
        __metadata('design:paramtypes', [sensorValue_service_1.SensorValueService, sensor_service_1.SensorService, screen_service_1.ScreenService])
    ], SensorValuesScreenComponent);
    return SensorValuesScreenComponent;
}());
exports.SensorValuesScreenComponent = SensorValuesScreenComponent;
//# sourceMappingURL=sensorValuesScreen.component.js.map