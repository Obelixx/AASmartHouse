import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { HouseModel } from '../models/house.model';

import { UserService } from './user.service';

import { AppSettings } from '../app.settings';

@Injectable()
export class HouseService {
    houseIds = [];
    token: string;
    selectedHouse: HouseModel; // populated on selected house in the housesScreen.component by roomsClicked(houseIndex);

    public get pagesCount() {
        let pagesCount = (this.houseIds.length / AppSettings.ApiSettings.elementsPerPage) | 0;
        if (this.houseIds.length % AppSettings.ApiSettings.elementsPerPage > 0) {
            pagesCount++;
        }
        console.log(pagesCount);
        console.log(this.houseIds);
        return pagesCount;
    }

    constructor(
        private userService: UserService,
        private http: Http
    ) {
        if (userService.userIsLoggedIn) {
            console.log(this.userService.token);
            console.log(this.userService);
            console.log(this.userService.userHousesIds);
            console.log(this.userService.currentUser);
            console.log(this.userService.currentUser.HousesIds);
            this.token = this.userService.token;
            this.houseIds = this.userService.currentUser.HousesIds;
            console.log(this.houseIds);
        }
        else {
            this.userService.loginEvents.subscribe((onLogin) => {
                if (onLogin) {
                    this.token = this.userService.token;
                    this.houseIds = this.userService.currentUser.HousesIds;
                } else {
                    this.token = '';
                    this.houseIds = [];
                }
            })
        }
    }

    getHouses(page: number, token: string = this.token) {
        let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.houses.Url;
        let options = this.authorizationHeaders(token);
        url += '?page=';
        url += page;
        url += '&pageSize=';
        url += AppSettings.ApiSettings.elementsPerPage;
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