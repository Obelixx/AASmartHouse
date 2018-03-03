import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../../shared/app.settings';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { DatabaseService } from './database.service';
import { UserService } from '../../user/services/user.service';
import { AggregationType, UserModel, HouseModel, RoomModel, SensorModel, SensorValueModel } from '../../shared/models/index';


@Injectable()
export class UserMetadataService {
  constructor(private db: DatabaseService) {
    if (localStorage.getItem(AppSettings.UserSettings.tokenKeyName)) {
      this.userIsLoggedIn = true;
    }
  }

  userIsLoggedInChanged: EventEmitter<boolean> = new EventEmitter();
  private _isLoggedIn = false;
  get userIsLoggedIn() {
    if (!localStorage.getItem(AppSettings.UserSettings.tokenKeyName)) {
      this.userIsLoggedIn = false;
    }
    return this._isLoggedIn;
  }

  set userIsLoggedIn(value: boolean) {
    this._isLoggedIn = value;
    this.userIsLoggedInChanged.emit(this._isLoggedIn);
  }

  private _currentUser: UserModel = UserModel.emptyUser;
  public get currentUser() {
    return this._currentUser;
  }
  public set currentUser(value: UserModel) {
    this._currentUser = value;
    this.currentUserChanged.emit(this._currentUser);
  }
  currentUserChanged: EventEmitter<UserModel> = new EventEmitter();

  // housesCountChanged = new EventEmitter(true);
  // private _housesCount: number = 1;
  // get housesCount() {
  //   return this._housesCount;
  // }

  // set housesCount(value: number) {
  //   this._housesCount = value;
  //   this.housesCountChanged.emit(this.housesCount);
  // }

  // roomsCountChanged = new EventEmitter(true);
  // private _roomsCount: number = 1;
  // get roomsCount() {
  //   return this._roomsCount;
  // }

  // set roomsCount(value: number) {
  //   this._roomsCount = value;
  //   this.roomsCountChanged.emit(this.roomsCount);
  // }

  // sensorsCountChanged = new EventEmitter(true);
  // private _sensorsCount: number = 1;
  // get sensorsCount() {
  //   return this._sensorsCount;
  // }

  // set sensorsCount(value: number) {
  //   this._sensorsCount = value;
  //   this.sensorsCountChanged.emit(this.sensorsCount);
  // }

  // loadHousesCount() {
  //   let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.user.Url;
  //   return this.db.authorizedGetRequest(url)
  //     .subscribe((response:UserModel) => {
  //       this.housesCount = response.HousesIds.length;
  //     })
  // }

  // loadRoomsCount() {
  //   let url = AppSettings.ApiSettings.api.Url + AppSettings.ApiSettings.houses.Url;
  //   return this.db.authorizedGetRequest(url)
  //     .subscribe((response:HouseModel) => {
  //       this.roomsCount = response.RoomIds.length;
  //     })
  // }
}