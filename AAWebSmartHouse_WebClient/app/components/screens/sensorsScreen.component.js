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
var sensor_model_1 = require('../../models/sensor.model');
var sensor_service_1 = require('../../services/sensor.service');
var room_service_1 = require('../../services/room.service');
var screen_service_1 = require('../../services/screen.service');
var SensorsScreenComponent = (function () {
    function SensorsScreenComponent(sensorService, roomService, screenService) {
        this.sensorService = sensorService;
        this.roomService = roomService;
        this.screenService = screenService;
        this.sensors = [new sensor_model_1.SensorModel(1, "temp1", "Temp in kitchen", "C", 1)];
        this.message = '';
        this.page = 1;
        this.sensors.splice(0);
        this.getSensors(this.page);
    }
    SensorsScreenComponent.prototype.getSensors = function (page) {
        var _this = this;
        this.sensors.splice(0);
        this.sensorService.getSensors(this.roomService.selectedRoom.RoomId, page)
            .subscribe(function (res) {
            if (Array.isArray(res)) {
                _this.sensors = res;
                _this.message = 'Success';
                if (_this.sensors.length == 0) {
                    _this.message += '; But you have no rooms in this house!';
                }
            }
            else {
                _this.message = res;
            }
        });
    };
    SensorsScreenComponent.prototype.previousClicked = function () {
        if (this.page > 1) {
            this.page--;
            this.getSensors(this.page);
        }
    };
    SensorsScreenComponent.prototype.nextClicked = function () {
        if (this.page < this.sensorService.pagesCount) {
            this.page++;
            this.getSensors(this.page);
        }
    };
    SensorsScreenComponent.prototype.sensorDataClicked = function (sensorDataIndex) {
        this.sensorService.selectedSensor = this.sensors[sensorDataIndex];
        //this.sensors[sensorDataIndex].SensorId
        //this.screenService.toScreen(SensorsScreenComponent);
    };
    SensorsScreenComponent = __decorate([
        core_1.Component({
            selector: 'sensorsScreen',
            templateUrl: './app/components/screens/templates/sensorsScreen.component.template.html'
        }), 
        __metadata('design:paramtypes', [sensor_service_1.SensorService, room_service_1.RoomService, screen_service_1.ScreenService])
    ], SensorsScreenComponent);
    return SensorsScreenComponent;
}());
exports.SensorsScreenComponent = SensorsScreenComponent;
//# sourceMappingURL=sensorsScreen.component.js.map