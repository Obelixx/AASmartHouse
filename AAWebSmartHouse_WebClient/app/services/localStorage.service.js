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
var LocalStorageService = (function () {
    function LocalStorageService() {
        this.localStorageKeyItem = 'AAWebSmartHouseWebClient';
        this.AAWebSmartHouseWebClient = {};
        this.updateObjectFromLocalStorage();
        this.updateLocalStorageFromObject();
    }
    LocalStorageService.prototype.setItem = function (item, value) {
        this.updateObjectFromLocalStorage();
        this.AAWebSmartHouseWebClient[item] = value;
        this.updateLocalStorageFromObject();
    };
    LocalStorageService.prototype.getItem = function (item) {
        this.updateObjectFromLocalStorage();
        return this.AAWebSmartHouseWebClient["item"];
    };
    LocalStorageService.prototype.hasItem = function (item) {
        this.updateObjectFromLocalStorage();
        return this.AAWebSmartHouseWebClient.hasOwnProperty(item);
    };
    LocalStorageService.prototype.clearItem = function (item) {
        this.updateObjectFromLocalStorage();
        this.AAWebSmartHouseWebClient[item] = undefined;
        this.updateLocalStorageFromObject();
    };
    LocalStorageService.prototype.clearAll = function () {
        this.clearLocalStorage();
    };
    LocalStorageService.prototype.updateObjectFromLocalStorage = function () {
        var localStorageAsObject = JSON.parse(localStorage.getItem(this.localStorageKeyItem));
        if (localStorageAsObject !== null) {
            this.AAWebSmartHouseWebClient = JSON.parse(localStorage.getItem(this.localStorageKeyItem));
        }
    };
    LocalStorageService.prototype.updateLocalStorageFromObject = function () {
        localStorage.setItem(this.localStorageKeyItem, JSON.stringify(this.AAWebSmartHouseWebClient));
    };
    LocalStorageService.prototype.clearLocalStorage = function () {
        localStorage.removeItem(this.localStorageKeyItem);
    };
    LocalStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=localStorage.service.js.map