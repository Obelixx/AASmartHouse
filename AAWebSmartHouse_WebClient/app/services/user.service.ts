import { Injectable, EventEmitter }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { UserModel } from '../models/user.model'

import { LocalStorageService } from './localStorage.service';

import { AppSettings } from '../app.settings';

@Injectable()
export class UserService {
    currentUser : UserModel = new UserModel('','','mail','username','id','pn',[''],['']);
    apiSettings = AppSettings.ApiSettings;
    loginEvents = new EventEmitter();
    toStoreToken = true;
    private _isLoggedIn = false;
    token: string;

    get userIsLoggedIn() {
        return this._isLoggedIn;
    }

    set userIsLoggedIn(value: boolean) {
        this._isLoggedIn = value;
        this.loginEvents.emit(this._isLoggedIn);
    }

    get storageToken() {
        return this.localStorageService.getItem(this.apiSettings.tokenKeyName);
    }
    set storageToken(token: string) {
        this.localStorageService.setItem(this.apiSettings.tokenKeyName, token);
    }

    get userHousesIds(){
        return this.currentUser.HousesIds;
    }

    constructor(private http: Http, private localStorageService: LocalStorageService) {
        if (this.localStorageService.hasItem(this.apiSettings.tokenKeyName)) {
            this.token = this.localStorageService.getItem(this.apiSettings.tokenKeyName);
            this.login(this.token);
        }
    }


    // TODO: not used so far..
    register(
        email: string,
        password: string,
        confirmPassword: string,
        firstName: string,
        lastName: string
    ): Observable<Object> {

        let body = JSON.stringify({ email, password, confirmPassword, firstName, lastName });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers })

        return this.http.post(this.apiSettings.api.Url + this.apiSettings.register.Url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getToken(userEmail, userPassword) {
        let body = "username=" + userEmail + "&password=" + userPassword + "&grant_type=password";
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        return this.authorizedPostRequestWithData(this.apiSettings.api.Url + this.apiSettings.token.Url, body, options);
    }

    getUserData(token: string = this.token) {
        let url = this.apiSettings.api.Url + this.apiSettings.user.Url;
        let options = this.authorizationHeaders(token);
        return this.authorizedGetRequest(url, options);
    }

    setUserData(stringifiedUserData: string, token: string = this.token) {
        let url = this.apiSettings.api.Url + this.apiSettings.user.Url;
        let options = this.authorizationHeaders(token);
        return this.authorizedPostRequestWithData(url, stringifiedUserData, options);
    }

    changePassword(stringifiedUserData: string, token: string = this.token) {
        let url = this.apiSettings.api.Url + this.apiSettings.account.ChangePasswordUrl;
        let options = this.authorizationHeaders(token);
        return this.authorizedPostRequestWithData(url, stringifiedUserData, options);
    }

    getGroups(groupIds: [string], token: string = this.token) {
        let url = this.apiSettings.api.Url + this.apiSettings.groups.Url;
        url += '?';
        groupIds.forEach(groupId => {
            url += 'groupIds=' + groupId + '&';
        });
        let options = this.authorizationHeaders(token);
        return this.authorizedGetRequest(url, options);
    }

    private authorizedGetRequest(url: string, headers: RequestOptions = this.authorizationHeaders(this.token)) {
        let request = this.http.get(url, headers)
            .map((response, index) => {
                this.userIsLoggedIn = true;
                return this.extractData(response);
            })
            .catch((error) => {
                this.logout();
                return this.handleError(error);
            });
        return request;
    }

    private authorizedPostRequestWithData(url: string, stringifiedUserData: string, options: RequestOptions = this.authorizationHeaders(this.token)) {
        let request = this.http.post(url, stringifiedUserData, options)
            .map((response, index) => {
                this.userIsLoggedIn = true;
                return this.extractData(response);
            });
        return request;
    }

    private login(token: string) {
        console.log("logging in ..")
        if (this.toStoreToken) {
            this.localStorageService.setItem(AppSettings.ApiSettings.tokenKeyName, token);
        }
        this.token = token;
        this.userIsLoggedIn = true;
        this.getUserData(this.token)
            .subscribe((response) => {
                this.currentUser = response;
            });

    }

    logout() {
        console.log("logging out ..")
        this.currentUser = new UserModel('','','mail','username','id','pn',[''],['']);;
        this.localStorageService.clearItem(this.apiSettings.tokenKeyName);
        this.token = '';
        this.userIsLoggedIn = false;
    }

    private authorizationHeaders(token: string) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return options;
    }

    private extractData(res: Response) {
        let body;
        try {
            body = res.json(); // This throws on OK(200) response with empty body.
            if (body.access_token) {
                this.login(body.access_token);
            }
            if (body.HousesIds) {
                this.currentUser.HousesIds = body.HousesIds;
            }
        }
        catch (err) {
        }
        return body;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` :
                error.error_description ? error.error_description : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}