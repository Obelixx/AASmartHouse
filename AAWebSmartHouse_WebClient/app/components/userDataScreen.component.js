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
var user_service_1 = require('../services/user.service');
var UserDataScreenComponent = (function () {
    function UserDataScreenComponent(userService) {
        var _this = this;
        this.userService = userService;
        this.userId = 'userId';
        this.firstName = 'firstName';
        this.lastName = 'lastName';
        this.oldEmail = 'oldEmail';
        this.newEmail = 'newEmail';
        this.phoneNumber = 'phoneNumber';
        this.isEditMode = false;
        this.errorMsg = '';
        this.successMsg = '';
        userService.getUserData()
            .subscribe(function (result) {
            console.log(JSON.stringify(result));
            _this.firstName = result.FirstName;
            _this.lastName = result.LastName;
            _this.oldEmail = result.EMail;
            _this.newEmail = result.EMail;
            _this.phoneNumber = result.PhoneNumber;
            _this.userId = result.Id;
        });
    }
    UserDataScreenComponent.prototype.onSaveChangesClicked = function () {
        var _this = this;
        var userData = JSON.stringify({
            FirstName: this.firstName,
            LastName: this.lastName,
            NewEMail: this.newEmail,
            OldEMail: this.oldEmail,
            PhoneNumber: this.phoneNumber
        });
        this.userService.setUserData(userData)
            .catch(function (err, cought) {
            try {
                var error = JSON.parse(err._body);
                _this.errorMsg = error.error_description || error.Message;
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
    UserDataScreenComponent = __decorate([
        core_1.Component({
            selector: 'user-data',
            providers: [],
            templateUrl: './app/components/templates/userDataScreen.component.template.html',
            directives: []
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], UserDataScreenComponent);
    return UserDataScreenComponent;
}());
exports.UserDataScreenComponent = UserDataScreenComponent;
//# sourceMappingURL=userDataScreen.component.js.map