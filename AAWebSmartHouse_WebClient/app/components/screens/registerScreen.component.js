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
var Observable_1 = require('rxjs/Observable');
var user_service_1 = require('../../services/user.service');
var RegisterScreenComponent = (function () {
    function RegisterScreenComponent(userService) {
        this.userService = userService;
        this.userEmail = '';
        this.userPassword = '';
        this.userConfirmPassword = '';
        this.firstName = '';
        this.lastName = '';
        this.errorMsg = '';
        this.successMsg = '';
    }
    RegisterScreenComponent.prototype.register = function () {
        var _this = this;
        this.userService.register(this.userEmail, this.userPassword, this.userConfirmPassword, this.firstName, this.lastName)
            .catch(function (err, caught) {
            try {
                var error = JSON.parse(err._body);
                _this.errorMsg = error.error_description || error.Message;
                if (error.ModelState) {
                    for (var propertyName in error.ModelState) {
                        _this.errorMsg += ' ' + error.ModelState[propertyName][0];
                    }
                }
            }
            catch (err) {
                _this.errorMsg = 'Bad network connection or the server Api is down!';
            }
            finally {
                return Observable_1.Observable.throw('RegisterScreenComponent, register() - failed!');
            }
        })
            .subscribe(function (_no_res_expected) {
            _this.errorMsg = '';
            _this.successMsg = 'User ' + _this.userEmail + ' registered successfully!';
        });
    };
    RegisterScreenComponent = __decorate([
        core_1.Component({
            selector: 'registerScreen',
            templateUrl: './app/components/screens/templates/registerScreen.component.template.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], RegisterScreenComponent);
    return RegisterScreenComponent;
}());
exports.RegisterScreenComponent = RegisterScreenComponent;
//# sourceMappingURL=registerScreen.component.js.map