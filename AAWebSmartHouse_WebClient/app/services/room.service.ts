import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { RoomModel } from '../models/room.model';

import { UserService } from './user.service';
import { HouseService } from './house.service';

import { AppSettings } from '../app.settings';

@Injectable()
export class RoomService {
    houses: [RoomModel];
    roomIds = [];
    token: string;
    selectedRoom: RoomModel; // populated on selected room in the roomsScreen.component by sensorsClicked(houseIndex);

    get pagesCount() {
        let pagesCount = this.roomIds.length / AppSettings.ApiSettings.elementsPerPage;
        if (this.roomIds.length % AppSettings.ApiSettings.elementsPerPage > 0) {
            pagesCount++;
        }
        console.log("pages count: " + pagesCount);
        return pagesCount;
    }

    constructor(
        private userService: UserService,
        private houseService: HouseService,
        private http: Http
    ) {
        if (userService.userIsLoggedIn) {
            this.token = this.userService.token;
            this.roomIds = this.houseService.selectedHouse.RoomIds;
        }
        else {
            this.userService.loginEvents.subscribe((onLogin) => {
                if (onLogin) {
                    this.token = this.userService.token;
                    this.roomIds = this.houseService.selectedHouse.RoomIds;
                } else {
                    this.token = '';
                    this.roomIds = [];
                }
            })
        }
    }

    getRooms(houseId: string, page: number, token: string = this.token) {
        let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.rooms.Url;
        let options = this.authorizationHeaders(token);
        url += '?page=';
        url += page;
        url += '&pageSize=';
        url += AppSettings.ApiSettings.elementsPerPage;
        url += '&houseId=';
        url += houseId;
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
            console.log(body);
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