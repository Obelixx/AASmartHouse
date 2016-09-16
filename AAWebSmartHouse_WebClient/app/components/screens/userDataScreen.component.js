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
var screen_service_1 = require('../../services/screen.service');
var housesScreen_component_1 = require('./housesScreen.component');
var UserDataScreenComponent = (function () {
    function UserDataScreenComponent(userService, screenService) {
        var _this = this;
        this.userService = userService;
        this.screenService = screenService;
        this.userGroups = '';
        this.isEditMode = false;
        this.errorMsg = '';
        this.successMsg = '';
        this.passwordErrorMsg = '';
        this.passwordSuccessMsg = '';
        this.isChangePasswordMode = false;
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        userService.getUserData()
            .subscribe(function (result) {
            userService.getGroups(result.RoleIds)
                .subscribe(function (result) {
                var groups = [];
                result.forEach(function (group) {
                    groups.push(group.Name);
                });
                _this.userGroups = groups.join(', ');
            });
        });
    }
    UserDataScreenComponent.prototype.onSaveChangesClicked = function () {
        var _this = this;
        var userData = JSON.stringify({
            FirstName: this.userService.currentUser.FirstName,
            LastName: this.userService.currentUser.LastName,
            EMail: this.userService.currentUser.EMail,
            PhoneNumber: this.userService.currentUser.PhoneNumber
        });
        this.userService.setUserData(userData)
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
                return Observable_1.Observable.throw('UserDataScreenComponent, onSaveChangesClicked() - failed!');
            }
        })
            .subscribe(function (res) {
            _this.errorMsg = '';
            _this.successMsg = 'User data saved!';
            _this.isEditMode = false;
        });
    };
    UserDataScreenComponent.prototype.onEditClicked = function () {
        this.isEditMode = true;
    };
    UserDataScreenComponent.prototype.onChangePasswordClicked = function () {
        this.isChangePasswordMode = true;
    };
    UserDataScreenComponent.prototype.onSaveNewPasswordClicked = function () {
        var _this = this;
        var userData = JSON.stringify({
            OldPassword: this.oldPassword,
            NewPassword: this.newPassword,
            ConfirmPassword: this.confirmPassword
        });
        this.userService.changePassword(userData)
            .catch(function (err, caught) {
            try {
                var error = JSON.parse(err._body);
                _this.passwordErrorMsg = error.error_description || error.Message;
                if (error.ModelState) {
                    for (var propertyName in error.ModelState) {
                        _this.passwordErrorMsg += ' ' + error.ModelState[propertyName][0];
                    }
                }
            }
            catch (err) {
                _this.passwordErrorMsg = 'Bad network connection or the server Api is down!';
            }
            return Observable_1.Observable.throw('UserDataScreenComponent, onSaveNewPasswordClicked() - failed!');
        })
            .subscribe(function (res) {
            _this.passwordErrorMsg = '';
            _this.passwordSuccessMsg = 'New password saved!';
            _this.isChangePasswordMode = false;
        });
    };
    UserDataScreenComponent.prototype.housesClicked = function () {
        if (this.userService.userIsLoggedIn) {
            this.screenService.toScreen(housesScreen_component_1.HousesScreenComponent);
        }
    };
    UserDataScreenComponent = __decorate([
        core_1.Component({
            selector: 'userDataScreen',
            providers: [],
            templateUrl: './app/components/screens/templates/userDataScreen.component.template.html',
            directives: []
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, screen_service_1.ScreenService])
    ], UserDataScreenComponent);
    return UserDataScreenComponent;
}());
exports.UserDataScreenComponent = UserDataScreenComponent;
//# sourceMappingURL=userDataScreen.component.js.map