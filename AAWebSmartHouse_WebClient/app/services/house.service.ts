import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { HouseModel } from '../models/house.model';

import { UserService } from './user.service';

import { AppSettings } from '../app.settings';

@Injectable()
export class HouseService {
    apiSettings = AppSettings.ApiSettings;
    houses: [HouseModel];
    token: string;

    constructor(
        private userService: UserService,
        private http: Http
    ) {
        if (userService.userIsLoggedIn) {
            this.token = this.userService.token;
        }
        else {
            this.userService.loginEvents.subscribe((onLogin) => {
                if (onLogin) {
                    this.token = this.userService.token;
                } else {
                    this.token = '';
                }
            })
        }
    }

    getHouses(page: number, token: string = this.token) {
        let url = this.apiSettings.api.Url + this.apiSettings.houses.Url;
        let options = this.authorizationHeaders(token);
        url += '?page=';
        url += page;
        url += '&pageSize=';
        url += '1';        
        //url += AppSettings.ApiSettings.elementsPerPage;
        // ?page=XX&pageSize=20
        return this.authorizedGetRequest(url, options);
    }

    private authorizedGetRequest(url: string, headers: RequestOptions = this.authorizationHeaders(this.token)) {
        let request = this.http.get(url, headers)
            .map((response, index) => {
                return this.extractData(response);
            })
            .catch((error) => {
                return this.handleError(error);
            });
        return request;
    }

    private authorizedPostRequestWithData(url: string, stringifyedUserData: string, options: RequestOptions = this.authorizationHeaders(this.token)) {
        let request = this.http.post(url, stringifyedUserData, options)
            .map((response, index) => {
                return this.extractData(response);
            });
        return request;
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