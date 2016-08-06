import { Component }  from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { UserService } from '../services/user.service';

@Component({
    selector: 'user-data',
    providers: [],
    templateUrl: './app/components/templates/userDataScreen.component.template.html',
    directives: []
})
export class UserDataScreenComponent {
    userId = 'userId'
    firstName = 'firstName';
    lastName = 'lastName';
    oldEmail = 'oldEmail';
    newEmail = 'newEmail';
    phoneNumber = 'phoneNumber';
    isEditMode = false;
    errorMsg = '';
    successMsg = '';

    constructor(private userService: UserService) {
        userService.getUserData()
            .subscribe((result) => {
                console.log(JSON.stringify(result));

                this.firstName = result.FirstName;
                this.lastName = result.LastName;
                this.oldEmail = result.EMail;
                this.newEmail = result.EMail;
                this.phoneNumber = result.PhoneNumber
                this.userId = result.Id;
            });
    }

    onSaveChangesClicked() {
        let userData = JSON.stringify({
            FirstName: this.firstName,
            LastName: this.lastName,
            NewEMail: this.newEmail,
            OldEMail: this.oldEmail,
            PhoneNumber: this.phoneNumber
        })

        this.userService.setUserData(userData)
            .catch((err, cought) => {
                try {
                    let error = JSON.parse(err._body);
                    this.errorMsg = error.error_description || error.Message;
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
            })
    }

    onEditClicked() {
        this.isEditMode = true;
    }
}