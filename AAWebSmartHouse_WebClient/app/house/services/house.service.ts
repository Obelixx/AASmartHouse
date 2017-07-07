import { Injectable, EventEmitter } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../../shared/services/database.service';
import { UserMetadataService } from '../../shared/services/usermetadata.service';
import { AppSettings } from '../../shared/app.settings';
import { AggregationType, UserModel, HouseModel, RoomModel, SensorModel, SensorValueModel } from '../../shared/models/index';

@Injectable()
export class HouseService {

  userHouses: HouseModel[];
  private userData: UserModel;
  pages: number[] = new Array(5).fill(0).map((x, i) => i + 1);

  private _pageNumber: number;

  get pageNumber() {
    return this._pageNumber;
  }
  set pageNumber(value: number) {
    this._pageNumber = value;
    this.getHouses(this._pageNumber);
  }

  constructor(private db: DatabaseService, private router: Router) {
    this.getUser();
    this.pageNumber = 1;
  }

  private updatePages(housesCount: number) {
    this.pages = new Array(Math.ceil(housesCount / AppSettings.ApiSettings.elementsPerPage)).fill(0).map((x, i) => i + 1);
  }

  private getHouses(page: number) {
    let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.houses.Url;
    url += '?page=';
    url += page;
    url += '&pageSize=';
    url += AppSettings.ApiSettings.elementsPerPage;
    return this.db.authorizedGetRequest(url)
      .subscribe((result) => {
        this.userHouses = result;
      });
  }

  private getUser() {
    let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.user.Url;
    return this.db.authorizedGetRequest(url)
      .subscribe((response: UserModel) => {
        this.userData = response;
        this.updatePages(this.userData.HousesIds.length)
      })
  }
}