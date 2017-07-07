import { Injectable, EventEmitter } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../../shared/services/database.service';
import { UserMetadataService } from '../../shared/services/usermetadata.service';
import { AppSettings } from '../../shared/app.settings';
import { AggregationType, UserModel, HouseModel, RoomModel, SensorModel, SensorValueModel } from '../../shared/models/index';

@Injectable()
export class RoomService {

  private _houseId: any;
  get houseId() {
    return this._houseId;
  }
  set houseId(value: any) {
    this._houseId = value;
    this.getHouse();  
  }

  userRooms: RoomModel[];
  private house: HouseModel;
  pages: number[] = new Array(5).fill(0).map((x, i) => i + 1);

  private _pageNumber: number;
  get pageNumber(){
    return this._pageNumber;
  }
  set pageNumber(value: number){
    this._pageNumber = value;
    this.getRooms(this._pageNumber);
  }

  constructor(private db: DatabaseService, private router: Router) {
  }

  private updatePages(roomsCount: number) {
    this.pages = new Array(Math.ceil(roomsCount / AppSettings.ApiSettings.elementsPerPage)).fill(0).map((x, i) => i + 1);
    this.pageNumber = 1;
  }

  private getRooms(page: number) {
    let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.rooms.Url;
    url += '?page=';
    url += page;
    url += '&pageSize=';
    url += AppSettings.ApiSettings.elementsPerPage;
    url += '&houseId=';
    url += this.houseId;
    return this.db.authorizedGetRequest(url)
      .subscribe((result:RoomModel[]) => {
        this.userRooms = result;
      });
  }

  private getHouse() {
    let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.houses.Url;
    url += '?houseId=';
    url += this.houseId;
    return this.db.authorizedGetRequest(url)
      .subscribe((result:HouseModel) => {
        this.house = result;
        this.updatePages(this.house.RoomIds.length);
      });
  }
}