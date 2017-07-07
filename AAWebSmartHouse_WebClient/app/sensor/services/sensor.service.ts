import { Injectable, EventEmitter } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../../shared/services/database.service';
import { AppSettings } from '../../shared/app.settings';
import { AggregationType, UserModel, HouseModel, RoomModel, SensorModel, SensorValueModel } from '../../shared/models/index';

@Injectable()
export class SensorService {
  userSensors: SensorModel[];
  private room:RoomModel;
  pages: number[] = new Array(5).fill(0).map((x, i) => i + 1);

  private _pageNumber: number;
  get pageNumber(){
    return this._pageNumber;
  }
  set pageNumber(value: number){
    this._pageNumber = value;
    this.getSensors(this._pageNumber);
  }

  private _roomId:any;
  get roomId(){
    return this._roomId;
  }
  set roomId(value:any){
    this._roomId = value;
    this.getRoom();
  }

  constructor(private db: DatabaseService, private router: Router) {
  }

  private updatePages(sensorsCount:number) {
    this.pages = new Array(Math.ceil(sensorsCount / AppSettings.ApiSettings.elementsPerPage)).fill(0).map((x, i) => i + 1);
    this.pageNumber = 1;
  }

  private getSensors(page: number) {
    let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.sensors.Url;
    url += '?page=';
    url += page;
    url += '&pageSize=';
    url += AppSettings.ApiSettings.elementsPerPage;
    url += '&roomId=';
    url += this.roomId;
    return this.db.authorizedGetRequest(url)
      .subscribe((result) => {
        this.userSensors = result;
      });
  }

  private getRoom() {
    let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.rooms.Url;
    url += '?roomId=';
    url += this.roomId;
    return this.db.authorizedGetRequest(url)
      .subscribe((result:RoomModel) => {
        this.room = result;
        this.updatePages(this.room.SensorsIds.length)
      });
  }
}