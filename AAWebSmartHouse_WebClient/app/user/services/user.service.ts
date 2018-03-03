import { Injectable, EventEmitter } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../../shared/services/database.service';
import { UserMetadataService } from '../../shared/services/usermetadata.service';
import { AppSettings } from '../../shared/app.settings';
import { AggregationType, UserModel, HouseModel, RoomModel, SensorModel, SensorValueModel } from '../../shared/models/index';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService, private router: Router, private user: UserMetadataService) {
    this.user.userIsLoggedInChanged.subscribe((loginStatus: boolean) => {
      if (loginStatus) {
        this.getUserData();
      }
    });

    if (this.user.userIsLoggedIn) {
      this.getUserData();
    }
  }

  //currentUser: UserModel = UserModel.emptyUser;
  currentUserGroups: string;

  login(userEmail: string, userPassword: string) {
    let body = "username=" + userEmail + "&password=" + userPassword + "&grant_type=password";
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    this.db.authorizedPostRequestWithData(AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.token.Url, body, options)
      .map((response, index) => {
        let body: any;
        try {
          body = response.json(); // This throws on OK(200) response with empty body.
          if (body.access_token) {
            localStorage.setItem(AppSettings.UserSettings.tokenKeyName, JSON.stringify(body));
            this.user.userIsLoggedIn = true;
          }
        }
        catch (err) {
          console.log("! login - catched: " + err);

        }
        return body;
      })
      .catch((error, caught) => {
        this.logout();
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` :
            error.error_description ? error.error_description : 'Server error';
        return Observable.throw(errMsg || error.json().error || 'Server error');
      })
      .subscribe((response) => {
        localStorage.setItem(AppSettings.UserSettings.tokenKeyName, JSON.stringify(response));
        this.user.userIsLoggedIn = true;
        this.router.navigate(['/home']);
      })
  }

  logout() {
    localStorage.removeItem(AppSettings.UserSettings.tokenKeyName);
    this.user.userIsLoggedIn = false;
    this.router.navigate(['/']);
  }

  register(
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
  ) {
    let body = JSON.stringify({ email, password, confirmPassword, firstName, lastName });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.db.authorizedPostRequestWithData(AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.register.Url, body, options)
      .map((response, index) => {
        let body: any;
        try {
          body = response.json(); // This throws on OK(200) response with empty body.
        }
        catch (err) {
          console.log("! register() catched: " + err)
        }
        return body;
      })
      .catch((error, caught) => {
        //this.logout();
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` :
            error.error_description ? error.error_description : 'Server error';
        return Observable.throw(errMsg || error.json().error || 'Server error');
      })
      .subscribe((response) => {
        console.log("User registered!")
        this.router.navigate(['/home']);
      });
  }

  changePassword(stringifiedUserData: string) {
    let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.account.ChangePasswordUrl;
    return this.db.authorizedPostRequestWithData(url, stringifiedUserData);
  }

  getUserData() {
    let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.user.Url;
    return this.db.authorizedGetRequest(url)
      .subscribe((response: UserModel) => {
        this.user.currentUser = response;
        this.getGroups(this.user.currentUser.RoleIds);
      })
  }

  private getGroups(groupIds: [string]) {
    let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.groups.Url;
    url += '?';
    groupIds.forEach(groupId => {
      url += 'groupIds=' + groupId + '&';
    });
    return this.db.authorizedGetRequest(url)
      .subscribe((response) => {
        let groups: string[] = [];
        response.forEach((group: any) => {
          groups.push(group.Name);
        });
        this.currentUserGroups = "";
        this.currentUserGroups = groups.join(', ');
      })
  }
}