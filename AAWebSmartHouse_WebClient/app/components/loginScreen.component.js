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
var user_model_1 = require('../models/user.model');
var user_service_1 = require('../services/user.service');
var LoginScreenComponent = (function () {
    function LoginScreenComponent(userService) {
        this.userService = userService;
        this.user = new user_model_1.UserModel('', '');
        this.errorMsg = '';
    }
    LoginScreenComponent.prototype.login = function () {
        if (!this._service.login(this.user)) {
            this.errorMsg = 'Failed to login';
        }
    };
    LoginScreenComponent = __decorate([
        core_1.Component({
            selector: 'loginScreen',
            templateUrl: './app/components/templates/loginScreen.component.template.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], LoginScreenComponent);
    return LoginScreenComponent;
}());
exports.LoginScreenComponent = LoginScreenComponent;
//# sourceMappingURL=loginScreen.component.js.map