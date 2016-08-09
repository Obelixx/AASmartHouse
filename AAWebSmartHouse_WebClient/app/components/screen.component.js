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
var loginScreen_component_1 = require('./screens/loginScreen.component');
var screen_service_1 = require('../services/screen.service');
var app_settings_1 = require('../app.settings');
var ScreenComponent = (function () {
    function ScreenComponent(screenService, componentResolver) {
        var _this = this;
        this.screenService = screenService;
        this.componentResolver = componentResolver;
        this.initialCildrenCount = 0;
        screenService.addScreenEvent.subscribe(function (screen) {
            _this.renderScreen(screen);
        });
    }
    ScreenComponent.prototype.getArrayWithMaxScreensLength = function () {
        return new Array(app_settings_1.AppSettings.ScreenServiceSettings.numberOfScreensToKeep);
    };
    // todo: we dont need this!
    ScreenComponent.prototype.addToScreenArray = function () {
        this.screenService.addScreen(loginScreen_component_1.LoginScreenComponent);
    };
    ScreenComponent.prototype.renderScreen = function (screen) {
        var _this = this;
        this.screenContainer.clear();
        this.componentResolver.resolveComponent(screen)
            .then(function (factory) {
            _this.screenContainer.createComponent(factory);
        });
    };
    __decorate([
        core_1.ViewChild('screenContainer', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], ScreenComponent.prototype, "screenContainer", void 0);
    ScreenComponent = __decorate([
        core_1.Component({
            selector: 'screen',
            providers: [],
            templateUrl: './app/components/templates/screen.component.template.html',
            directives: []
        }), 
        __metadata('design:paramtypes', [screen_service_1.ScreenService, core_1.ComponentResolver])
    ], ScreenComponent);
    return ScreenComponent;
}());
exports.ScreenComponent = ScreenComponent;
//# sourceMappingURL=screen.component.js.map