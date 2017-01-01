import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { SensorModel } from '../models/sensor.model';
import { SensorValueModel } from '../models/sensorValue.model';

import { UserService } from './user.service';
import { SensorService } from './sensor.service';

import { AppSettings } from '../app.settings';
import { SensorDataAggregationType } from '../app.settings';

@Injectable()
export class SensorValueService {
    sensorDataIdsByHours = [];
    // sensorDataIdsByDays = [];
    // sensorDataIdsByWeeks = [];
    // sensorDataIdsByMonths = [];
    token: string;

    constructor(
        private userService: UserService,
        private sensorService: SensorService,
        private http: Http
    ) {
        if (userService.userIsLoggedIn) {
            this.token = this.userService.token;
            this.sensorDataIdsByHours = this.sensorService.selectedSensor.SensorValuesIds;//.SensorDataIdsByHours;
            // this.sensorDataIdsByDays = this.sensorService.selectedSensor.SensorDataIdsByDays;
            // this.sensorDataIdsByWeeks = this.sensorService.selectedSensor.SensorDataIdsByWeeks;
            // this.sensorDataIdsByMonths = this.sensorService.selectedSensor.SensorDataIdsByMonths;
        }
        else {
            this.userService.loginEvents.subscribe((onLogin) => {
                if (onLogin) {
                    this.token = this.userService.token;
                    this.sensorDataIdsByHours = this.sensorService.selectedSensor.SensorValuesIds;
                    // this.sensorDataIdsByDays = this.sensorService.selectedSensor.SensorDataIdsByDays;
                    // this.sensorDataIdsByWeeks = this.sensorService.selectedSensor.SensorDataIdsByWeeks;
                    // this.sensorDataIdsByMonths = this.sensorService.selectedSensor.SensorDataIdsByMonths;
                } else {
                    this.token = '';
                    this.sensorDataIdsByHours = [];
                    // this.sensorDataIdsByDays = [];
                    // this.sensorDataIdsByWeeks = [];
                    // this.sensorDataIdsByMonths = [];
                }
            })
        }
    }

    pagesCount(aggregationType: SensorDataAggregationType) {
        let pagesCount = this.sensorDataIdsByHours.length / AppSettings.ApiSettings.elementsPerPage | 0;
                if (this.sensorDataIdsByHours.length % AppSettings.ApiSettings.elementsPerPage > 0) {
                    pagesCount += 1;
                }
           
        console.log(pagesCount);
        return pagesCount;
    }
    //// GET api/SensorValue?sensorId=sensorId&aggregationType=ByHour/ByDay/ByWeek/ByMonth&page=1&pageSize=10
    //aggregationType=ByHour/ByDay/ByWeek/ByMonth
    getSensorValues(sensorId: string, aggregationType: SensorDataAggregationType = SensorDataAggregationType.ByHour, page: number, token: string = this.token) {
        let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.sensorValues.Url;
        let options = this.authorizationHeaders(token);
        url += '?page=';
        url += page;
        url += '&pageSize=';
        url += AppSettings.ApiSettings.elementsPerPage;
        url += '&sensorId=';
        url += sensorId;
        url += '&aggregationType=';
        url += aggregationType;
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