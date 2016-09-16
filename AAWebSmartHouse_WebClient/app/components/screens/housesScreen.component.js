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
var house_model_1 = require('../../models/house.model');
var house_service_1 = require('../../services/house.service');
var screen_service_1 = require('../../services/screen.service');
var roomsScreen_component_1 = require('./roomsScreen.component');
var HousesScreenComponent = (function () {
    function HousesScreenComponent(houseService, screenService) {
        this.houseService = houseService;
        this.screenService = screenService;
        this.houses = [new house_model_1.HouseModel('1', '1', '1', 'desc', [1, 2, 3])];
        this.message = '';
        this.page = 1;
        this.houses.splice(0);
        this.getHouses(this.page);
    }
    HousesScreenComponent.prototype.getHouses = function (page) {
        var _this = this;
        this.houses.splice(0);
        this.houseService.getHouses(page)
            .subscribe(function (res) {
            if (Array.isArray(res)) {
                _this.houses = res;
                _this.message = 'Success';
                if (_this.houses.length == 0) {
                    _this.message += '; But you have no houses!';
                }
            }
            else {
                _this.message = res;
            }
        });
    };
    HousesScreenComponent.prototype.previousClicked = function () {
        if (this.page > 1) {
            this.page--;
            this.getHouses(this.page);
        }
    };
    HousesScreenComponent.prototype.nextClicked = function () {
        if (this.page < this.houseService.pagesCount) {
            this.page++;
            this.getHouses(this.page);
        }
    };
    HousesScreenComponent.prototype.roomsClicked = function (houseIndex) {
        this.houseService.selectedHouse = this.houses[houseIndex];
        if (this.houses[houseIndex].RoomIds.length > 0) {
            this.screenService.toScreen(roomsScreen_component_1.RoomsScreenComponent);
        }
    };
    HousesScreenComponent = __decorate([
        core_1.Component({
            selector: 'housesScreen',
            templateUrl: './app/components/screens/templates/housesScreen.component.template.html'
        }), 
        __metadata('design:paramtypes', [house_service_1.HouseService, screen_service_1.ScreenService])
    ], HousesScreenComponent);
    return HousesScreenComponent;
}());
exports.HousesScreenComponent = HousesScreenComponent;
//# sourceMappingURL=housesScreen.component.js.map