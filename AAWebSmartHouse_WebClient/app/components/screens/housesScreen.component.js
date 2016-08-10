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
var HousesScreenComponent = (function () {
    function HousesScreenComponent(houseService) {
        this.houseService = houseService;
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
        // TODO: Get somehow maxPages??
        // Maybe return houses count to user profile!?
        this.page++;
        this.getHouses(this.page);
    };
    HousesScreenComponent = __decorate([
        core_1.Component({
            selector: 'housesScreen',
            templateUrl: './app/components/screens/templates/housesScreen.component.template.html'
        }), 
        __metadata('design:paramtypes', [house_service_1.HouseService])
    ], HousesScreenComponent);
    return HousesScreenComponent;
}());
exports.HousesScreenComponent = HousesScreenComponent;
//# sourceMappingURL=housesScreen.component.js.map