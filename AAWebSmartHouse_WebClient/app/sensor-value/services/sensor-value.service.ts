import { Injectable, EventEmitter } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../../shared/services/database.service';
import { UserMetadataService } from '../../shared/services/usermetadata.service';
import { AppSettings } from '../../shared/app.settings';
import { AggregationType, UserModel, HouseModel, RoomModel, SensorModel, SensorValueModel } from '../../shared/models/index';

@Injectable()
export class SensorValueService {
  userSensorValues: SensorValueModel[];
  onUserSensorValuesChanged: EventEmitter<SensorValueModel[]> = new EventEmitter();

  sensor: SensorModel;
  pages: number[] = new Array(5).fill(0).map((x, i) => i + 1);

  private _sensorId: any;
  get sensorId() {
    return this._sensorId;
  }
  set sensorId(value: any) {
    this._sensorId = value;
    this.getSensor();
  }

  private _pageNumber: number;
  get pageNumber() {
    return this._pageNumber;
  }
  set pageNumber(value: number) {
    this._pageNumber = value;
    this.getSensorValues(this._pageNumber);
  }

  private _aggregationType: AggregationType = AggregationType.Hour;
  get aggregationType() {
    return this._aggregationType
  }
  set aggregationType(value: AggregationType) {
    this._aggregationType = value;
    this.getSensorValuesCount(this.sensorId, this.aggregationType);
    this._pageNumber = 0;
    this.pageNumber = 1;
  }

  constructor(private db: DatabaseService, private router: Router) {
  }

  //// GET api/SensorValue?sensorId=sensorId&page=1&aggregationType=ByHour/ByDay/ByWeek/ByMonth&pageSize=10&orderAscendingByDate=false
  private updatePages(sensorValuesCount: number) {
    this.pages = new Array(Math.ceil(sensorValuesCount / AppSettings.ApiSettings.elementsPerPage)).fill(0).map((x, i) => i + 1);
    this.pageNumber = 1;
  }

  private getSensorValues(page: number, sensorId: any = this.sensorId, aggregationType: AggregationType = this.aggregationType, orderAscendingByDate: boolean = false) {
    let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.sensorValues.Url;
    url += '?page=';
    url += page;
    url += '&pageSize=';
    url += AppSettings.ApiSettings.elementsPerPage;
    url += '&sensorId=';
    url += sensorId;
    url += '&aggregationType=';
    url += "By" + AggregationType[aggregationType];
    url += '&orderAscendingByDate=';
    url += orderAscendingByDate;
    return this.db.authorizedGetRequest(url)
      .subscribe((result: SensorValueModel[]) => {
        this.userSensorValues = result;
        this.onUserSensorValuesChanged.emit(this.userSensorValues);
      });
  }

  private getSensorValuesCount(sensorId: any = this.sensorId, aggregationType: AggregationType = this.aggregationType) {
    let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.sensorValues.Url;
    url += '?sensorId=';
    url += sensorId;
    url += '&aggregationType=';
    url += "By" + AggregationType[aggregationType];
    return this.db.authorizedGetRequest(url)
      .subscribe((result: number) => {
        this.updatePages(result);
      });
  }

  private getSensor() {
    let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.sensors.Url;
    url += '?sensorId=';
    url += this.sensorId;
    return this.db.authorizedGetRequest(url)
      .subscribe((result: SensorModel) => {
        this.sensor = result;
        this.getSensorValuesCount(this.sensor.SensorId);
      });
  }
}