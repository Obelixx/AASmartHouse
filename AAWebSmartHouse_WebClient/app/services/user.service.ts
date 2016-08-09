import { Injectable, EventEmitter }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http'
import { Observable }     from 'rxjs/Observable';

import { UserModel } from '../models/user.model';

import { LocalStorageService } from './localStorage.service';

import { AppSettings } from '../app.settings';

@Injectable()
export class UserService {
    settings = AppSettings.UserServiceSettings;
    loginEvents = new EventEmitter();
    toStoreToken = true;
    firstAndLastName = '';
    private _isLoggedIn = false;
    private token: string;

    get userIsLoggedIn() {
        return this._isLoggedIn;
    }

    set userIsLoggedIn(value: boolean) {
        this._isLoggedIn = value;
        this.loginEvents.emit(this._isLoggedIn);
    }


    get storageToken() {
        return this.localStorageService.getItem(this.settings.tokenKeyName);
    }
    set storageToken(token: string) {
        this.localStorageService.setItem(this.settings.tokenKeyName, token);
    }

    constructor(private http: Http, private localStorageService: LocalStorageService) {
        if (this.localStorageService.hasItem(this.settings.tokenKeyName)) {
            this.token = this.localStorageService.getItem(this.settings.tokenKeyName);
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

        return this.http.post(this.settings.api.Url + this.settings.register.Url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getToken(user: UserModel) {
        let body = "username=" + user.email + "&password=" + user.password + "&grant_type=password";
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        return this.authorizedPostRequestWithData(this.settings.api.Url + this.settings.token.Url, body, options);
    }

    getUserData(token: string = this.token) {
        return this.authorizedGetRequest(this.settings.api.Url + this.settings.user.Url, this.authorizationHeaders(this.token));
    }

    setUserData(stringifyedUserData: string, token: string = this.token) {
        return this.authorizedPostRequestWithData(this.settings.api.Url + this.settings.user.Url, stringifyedUserData, this.authorizationHeaders(this.token));
    }

    changePassword(stringifyedUserData: string, token: string = this.token) {
        return this.authorizedPostRequestWithData(this.settings.api.Url + this.settings.account.ChangePasswordUrl, stringifyedUserData, this.authorizationHeaders(this.token));
    }

    getGroups(groupIds: [string], token: string = this.token) {
        let url = this.settings.api.Url + this.settings.groups.Url;
        url += '?';
        groupIds.forEach(groupId => {
            url += 'groupIds=' + groupId + '&';
        });
        let options = this.authorizationHeaders(this.token);
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
            this.localStorageService.setItem(AppSettings.UserServiceSettings.tokenKeyName, token);
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
        this.localStorageService.clearItem(this.settings.tokenKeyName);
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
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` :
                error.error_description ? error.error_description : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}