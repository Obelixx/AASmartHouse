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
    private _isLoggedIn = false;
    toStoreToken = true;
    username = 'stranger';

    get isLoggedIn() {
        return this._isLoggedIn;
    }

    set isLoggedIn(value: boolean) {
        this._isLoggedIn = value;
        this.loginEvents.emit(this._isLoggedIn);
    }

    constructor(private http: Http, private localStorageService: LocalStorageService) {
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

        return this.http.post(this.settings.apiUrl + this.settings.registerUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getToken(user: UserModel) {
        let body = "username=" + user.email + "&password=" + user.password + "&grant_type=password";
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.settings.apiUrl + this.settings.tokenUrl, body, options)
            .map((response, index) => {
                this.isLoggedIn = true;
                let result = this.extractData(response);
                if (this.toStoreToken) {

                }
                return result;
            })
        //.catch(this.handleError);
    }

    getUserData(token: string) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);

        let options = new RequestOptions({ headers: headers });

        let request = this.http.get(this.settings.apiUrl + this.settings.userUrl, { headers })
            .map(() => {
                this.isLoggedIn = true;
                return this.extractData
            })
            .catch((error) => {
                this.isLoggedIn = false;
                return this.extractData(error);
            });

        return request;
    }

    get token() {
        return this.localStorageService.getItem(this.settings.tokenKeyName);
    }

    set token(token: string) {
        this.localStorageService.setItem(this.settings.tokenKeyName,token);
    }

    logout() {
        this.localStorageService.clearItem(this.settings.tokenKeyName);
        this.isLoggedIn = false;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        console.error("!!ERROR in user.service !!: " + JSON.stringify(error));
        this.isLoggedIn = false;
        return Observable.throw(errMsg);
    }
}