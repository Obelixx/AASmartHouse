import { Component }  from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { UserService } from '../../services/user.service';
import { ScreenService } from '../../services/screen.service';

import { HousesScreenComponent } from './housesScreen.component';

@Component({
    selector: 'userDataScreen',
    providers: [],
    templateUrl: './app/components/screens/templates/userDataScreen.component.template.html',
    directives: []
})
export class UserDataScreenComponent {
    userId = 'userId';
    userGroups = '';
    userHouses = [];
    firstName = 'firstName';
    lastName = 'lastName';
    email = 'Email';
    phoneNumber = 'phoneNumber';
    isEditMode = false;
    errorMsg = '';
    successMsg = '';
    passwordErrorMsg = '';
    passwordSuccessMsg = '';
    isChangePasswordMode = false;
    oldPassword = '';
    newPassword = '';
    confirmPassword = '';

    constructor(
        private userService: UserService,
        private screenService: ScreenService
    ) {
        userService.getUserData()
            .subscribe((result) => {
                console.log(JSON.stringify(result));

                this.firstName = result.FirstName;
                this.lastName = result.LastName;
                this.email = result.EMail;
                this.phoneNumber = result.PhoneNumber
                this.userId = result.Id;
                this.userHouses = result.HousesIds;
                userService.getGroups(result.RoleIds)
                    .subscribe((result) => {
                        let groups = [];
                        result.forEach(group => {
                            groups.push(group.Name);
                        });
                        this.userGroups = groups.join(', ');
                    });
            });
    }

    onSaveChangesClicked() {
        let userData = JSON.stringify({
            FirstName: this.firstName,
            LastName: this.lastName,
            EMail: this.email,
            PhoneNumber: this.phoneNumber
        })

        this.userService.setUserData(userData)
            .catch((err, caught) => {
                try {
                    let error = JSON.parse(err._body);
                    this.errorMsg = error.error_description || error.Message;
                    if (error.ModelState) {
                        for (var propertyName in error.ModelState) {
                            this.errorMsg += ' ' + error.ModelState[propertyName][0];
                        }
                    }
                }
                catch (err) {
                    this.errorMsg = 'Bad network connection or the server Api is down!';
                }
                finally {
                    return Observable.throw('UserDataScreenComponent, onSaveChangesClicked() - failed!');
                }
            })
            .subscribe(res => {
                this.errorMsg = '';
                this.successMsg = 'User data saved!';
                this.isEditMode = false;
            });
    }

    onEditClicked() {
        this.isEditMode = true;
    }

    onChangePasswordClicked() {
        this.isChangePasswordMode = true;
    }

    onSaveNewPasswordClicked() {
        let userData = JSON.stringify({
            OldPassword: this.oldPassword,
            NewPassword: this.newPassword,
            ConfirmPassword: this.confirmPassword
        })

        this.userService.changePassword(userData)
            .catch((err, caught) => {
                try {
                    let error = JSON.parse(err._body);
                    this.passwordErrorMsg = error.error_description || error.Message;
                    if (error.ModelState) {
                        for (var propertyName in error.ModelState) {
                            this.passwordErrorMsg += ' ' + error.ModelState[propertyName][0];
                        }
                    }
                }
                catch (err) {
                    this.passwordErrorMsg = 'Bad network connection or the server Api is down!';
                }

                return Observable.throw('UserDataScreenComponent, onSaveNewPasswordClicked() - failed!');
            })
            .subscribe(res => {
                this.passwordErrorMsg = '';
                this.passwordSuccessMsg = 'New password saved!';
                this.isChangePasswordMode = false;
            });
    }

    housesClicked() {
        if (this.userService.userIsLoggedIn) {
            this.screenService.toScreen(HousesScreenComponent);
        }
    }
}