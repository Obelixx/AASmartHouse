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
var screen_service_1 = require('../services/screen.service');
var loginNavBar_component_1 = require('./loginNavBar.component');
var screen_1 = require('../models/screen');
var ScreenComponent = (function () {
    function ScreenComponent(screenService, dcl, injector, _elementRef, _viewContainerRef) {
        this.screenService = screenService;
        this.dcl = dcl;
        this.injector = injector;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this.textField = 'initial text';
        screenService.screens;
    }
    ScreenComponent.prototype.addToScreenArray = function () {
        this.screenService.addScreen(new screen_1.Screen(loginNavBar_component_1.LoginNavBarComponent, null));
        this._viewContainerRef.clear();
        // this.screenService.screens.forEach(screen => {
        //     screen.componentElement = this.dcl.loadNextToLocation(screen.componentClass, this._viewContainerRef);
        // });
        var start = this.screenService.screens.length - 1;
        for (var index = start; index >= 0; index--) {
            var screen_2 = this.screenService.screens[index];
            screen_2.componentElement = this.dcl.loadNextToLocation(screen_2.componentClass, this._viewContainerRef);
        }
    };
    ScreenComponent = __decorate([
        core_1.Component({
            selector: 'screen',
            providers: [],
            templateUrl: './app/components/templates/screen.component.template.html',
            directives: []
        }), 
        __metadata('design:paramtypes', [screen_service_1.ScreenService, core_1.DynamicComponentLoader, core_1.Injector, core_1.ElementRef, core_1.ViewContainerRef])
    ], ScreenComponent);
    return ScreenComponent;
}());
exports.ScreenComponent = ScreenComponent;
//# sourceMappingURL=screen.component.js.map