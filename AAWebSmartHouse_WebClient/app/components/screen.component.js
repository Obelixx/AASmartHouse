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
var screen_model_1 = require('../models/screen.model');
var loginNavBar_component_1 = require('./loginNavBar.component');
var screen_service_1 = require('../services/screen.service');
var app_settings_1 = require('../app.settings');
var ScreenComponent = (function () {
    function ScreenComponent(screenService, dcl, injector) {
        var _this = this;
        this.screenService = screenService;
        this.dcl = dcl;
        this.injector = injector;
        //@ViewChild('screensContainer') screensContainer: ViewContainerRef;
        this.textField = 'initial text';
        screenService.screensChangeEvent.subscribe(function () {
            _this.renderScreens();
        });
    }
    ScreenComponent.prototype.getArrayWithMaxScreensLength = function () {
        return new Array(app_settings_1.AppSettings.ScreenServiceSettings.numberOfScreensToKeep);
    };
    ScreenComponent.prototype.addToScreenArray = function () {
        this.screenService.addScreen(new screen_model_1.ScreenModel(loginNavBar_component_1.LoginNavBarComponent));
    };
    ScreenComponent.prototype.renderScreens = function () {
        var screens = this.screenService.allScreens();
        this.screensContainer.clear();
        for (var index = (screens.length - 1); index >= 0; index--) {
            var screen_1 = screens[index];
            screen_1.componentElement = this.dcl.loadNextToLocation(screen_1.componentClass, this.screensContainer);
        }
    };
    __decorate([
        core_1.ViewChild('screensContainer0', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], ScreenComponent.prototype, "screensContainer", void 0);
    ScreenComponent = __decorate([
        core_1.Component({
            selector: 'screen',
            providers: [],
            templateUrl: './app/components/templates/screen.component.template.html',
            directives: []
        }), 
        __metadata('design:paramtypes', [screen_service_1.ScreenService, core_1.DynamicComponentLoader, core_1.Injector])
    ], ScreenComponent);
    return ScreenComponent;
}());
exports.ScreenComponent = ScreenComponent;
//# sourceMappingURL=screen.component.js.map