import { Injectable, EventEmitter }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { UserModel } from '../models/user.model';

import { LocalStorageService } from './localStorage.service';

import { AppSettings } from '../app.settings';

@Injectable()
export class UserService {
    apiSettings = AppSettings.ApiSettings;
    loginEvents = new EventEmitter();
    toStoreToken = true;
    firstAndLastName = '';
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

    constructor(private http: Http, private localStorageService: LocalStorageService) {
        if (this.localStorageService.hasItem(this.apiSettings.tokenKeyName)) {
            this.token = this.localStorageService.getItem(this.apiSettings.tokenKeyName);
            this.login(this.token);
        }
    }

    register(
        email: string,
        password: string,
        confirmPassword: string,
        firstname: string,
        lastname: string
    ): Observable<Object> {

        let body = JSON.stringify({ email, password, confirmPassword, firstname, lastname });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers })

        return this.http.post(this.apiSettings.api.Url + this.apiSettings.register.Url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getToken(user: UserModel) {
        let body = "username=" + user.email + "&password=" + user.password + "&grant_type=password";
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

    setUserData(stringifyedUserData: string, token: string = this.token) {
        let url = this.apiSettings.api.Url + this.apiSettings.user.Url;
        let options = this.authorizationHeaders(token);
        return this.authorizedPostRequestWithData(url, stringifyedUserData, options);
    }

    changePassword(stringifyedUserData: string, token: string = this.token) {
        let url = this.apiSettings.api.Url + this.apiSettings.account.ChangePasswordUrl;
        let options = this.authorizationHeaders(token);
        return this.authorizedPostRequestWithData(url, stringifyedUserData, options);
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

    private authorizedPostRequestWithData(url: string, stringifyedUserData: string, options: RequestOptions = this.authorizationHeaders(this.token)) {
        let request = this.http.post(url, stringifyedUserData, options)
            .map((response, index) => {
                this.userIsLoggedIn = true;
                return this.extractData(response);
            });
        return request;
    }

    private login(token: string) {
        if (this.toStoreToken) {
            this.localStorageService.setItem(AppSettings.ApiSettings.tokenKeyName, token);
        }
        this.token = token;
        this.userIsLoggedIn = true;
        this.getUserData(this.token)
            .subscribe((response) => {
                this.firstAndLastName = response.FirstName + ' ' + response.LastName;
            });

    }

    logout() {
        this.firstAndLastName = "";
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