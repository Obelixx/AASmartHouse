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
var app_settings_1 = require('../app.settings');
var ScreenService = (function () {
    function ScreenService() {
        this.settings = app_settings_1.AppSettings.ScreenServiceSettings;
        this.screensChangeEvent = new core_1.EventEmitter;
        this.screens = [];
    }
    ScreenService.prototype.allScreens = function () {
        return this.screens.slice();
    };
    ScreenService.prototype.addScreen = function (screeen) {
        this.screens.push(screeen);
        while (this.screens.length > this.settings.numberOfScreensToKeep) {
            this.screens.shift();
        }
        this.screensChangeEvent.emit({ value: this.allScreens() });
        return this.screens[this.screens.length - 1];
    };
    ScreenService.prototype.clearScreens = function () {
        this.screens = [];
        this.screensChangeEvent.emit({ value: this.allScreens() });
    };
    ScreenService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ScreenService);
    return ScreenService;
}());
exports.ScreenService = ScreenService;
//# sourceMappingURL=screen.service.js.map