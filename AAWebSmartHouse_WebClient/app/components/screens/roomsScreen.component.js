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
var room_model_1 = require('../../models/room.model');
var room_service_1 = require('../../services/room.service');
var house_service_1 = require('../../services/house.service');
var screen_service_1 = require('../../services/screen.service');
var sensorsScreen_component_1 = require('./sensorsScreen.component');
var RoomsScreenComponent = (function () {
    function RoomsScreenComponent(roomService, houseService, screenService) {
        this.roomService = roomService;
        this.houseService = houseService;
        this.screenService = screenService;
        this.rooms = [new room_model_1.RoomModel(1, "room", "et. 4", [1, 1, 1])];
        this.message = '';
        this.page = 1;
        this.rooms.splice(0);
        this.getRooms(this.page);
    }
    RoomsScreenComponent.prototype.getRooms = function (page) {
        var _this = this;
        this.rooms.splice(0);
        this.roomService.getRooms(this.houseService.selectedHouse.HouseId, page)
            .subscribe(function (res) {
            if (Array.isArray(res)) {
                _this.rooms = res;
                _this.message = 'Success';
                if (_this.rooms.length == 0) {
                    _this.message += '; But you have no rooms in this house!';
                }
            }
            else {
                _this.message = res;
            }
        });
    };
    RoomsScreenComponent.prototype.previousClicked = function () {
        if (this.page > 1) {
            this.page--;
            this.getRooms(this.page);
        }
    };
    RoomsScreenComponent.prototype.nextClicked = function () {
        if (this.page < this.roomService.pagesCount) {
            this.page++;
            this.getRooms(this.page);
        }
    };
    RoomsScreenComponent.prototype.sensorsClicked = function (sensorIndex) {
        this.roomService.selectedRoom = this.rooms[sensorIndex];
        if (this.roomService.selectedRoom.SensorsIds.length > 0) {
            this.screenService.toScreen(sensorsScreen_component_1.SensorsScreenComponent);
        }
    };
    RoomsScreenComponent = __decorate([
        core_1.Component({
            selector: 'roomsScreen',
            templateUrl: './app/components/screens/templates/roomsScreen.component.template.html'
        }), 
        __metadata('design:paramtypes', [room_service_1.RoomService, house_service_1.HouseService, screen_service_1.ScreenService])
    ], RoomsScreenComponent);
    return RoomsScreenComponent;
}());
exports.RoomsScreenComponent = RoomsScreenComponent;
//# sourceMappingURL=roomsScreen.component.js.map