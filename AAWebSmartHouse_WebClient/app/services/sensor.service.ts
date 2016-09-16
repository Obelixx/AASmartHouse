import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { SensorModel } from '../models/sensor.model';

import { UserService } from './user.service';
import { RoomService } from './room.service';

import { AppSettings } from '../app.settings';

@Injectable()
export class SensorService {
    sensorIds = [];
    token: string;
    selectedSensor: SensorModel; // populated on selected sensor in the sensorsScreen.component by sensorDataClicked(sensorIndex);

    get pagesCount() {
        let pagesCount = this.sensorIds.length / AppSettings.ApiSettings.elementsPerPage | 0;
        if (this.sensorIds.length % AppSettings.ApiSettings.elementsPerPage > 0) {
            pagesCount+=1;
        }
        console.log(pagesCount);
        return pagesCount;
    }

    constructor(
        private userService: UserService,
        private roomService: RoomService,
        private http: Http
    ) {
        if (userService.userIsLoggedIn) {
            this.token = this.userService.token;
            this.sensorIds = this.roomService.selectedRoom.SensorsIds;
        }
        else {
            this.userService.loginEvents.subscribe((onLogin) => {
                if (onLogin) {
                    this.token = this.userService.token;
                    this.sensorIds = this.roomService.selectedRoom.SensorsIds;
                } else {
                    this.token = '';
                    this.sensorIds = [];
                }
            })
        }
    }

    getSensors(roomId: string, page: number, token: string = this.token) {
        let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.sensors.Url;
        let options = this.authorizationHeaders(token);
        url += '?page=';
        url += page;
        url += '&pageSize=';
        url += AppSettings.ApiSettings.elementsPerPage;
        url += '&roomId=';
        url += roomId;
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