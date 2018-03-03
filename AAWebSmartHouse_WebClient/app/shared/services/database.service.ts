import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../../shared/app.settings';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class DatabaseService {
  constructor(private http: Http, private router: Router) {
  }

  get token(): string {
    let tokenStringObj = localStorage.getItem(AppSettings.UserSettings.tokenKeyName);
    if (tokenStringObj) {
      return JSON.parse(tokenStringObj).access_token;
    }
    else {
      return null;
    }
  }

  public authorizationHeaders(token: string) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  public authorizedGetRequest(url: string, headers: RequestOptions = this.authorizationHeaders(this.token)) {
    let request = this.http.get(url, headers)
      .map((response: any, index: any) => {
        return this.extractData(response);
      })
      .catch((error: any) => {
        return this.handleError(error);
      });
    return request;
  }

  public authorizedPostRequestWithData(url: string, stringifiedUserData: string, options: RequestOptions = this.authorizationHeaders(this.token)) {
    let request = this.http.post(url, stringifiedUserData, options)
    // .map((response: any, index: any) => {
    //   //this.userIsLoggedIn = true;
    //   return this.extractData(response);
    // });
    return request;
  }

  private extractData(res: Response) {
    let body: any;
    try {
      body = res.json(); // This throws on OK(200) response with empty body.
      // if (body.access_token) {
      //     this.login(body.access_token);
      // }
      // if (body.HousesIds) {
      //     this.currentUser.HousesIds = body.HousesIds;
      // }
    }
    catch (err) {
    }
    return body;
  }

  private handleError(error: any) {

    if (error.status == 401 && error.statusText == "Unauthorized") {
      console.log("Ding - Unauthorized! This url:" + this.router.url);
      localStorage.removeItem(AppSettings.UserSettings.tokenKeyName);
      if (this.router.url != '/') {
        this.router.navigate(['/']);
      }
      else {
        this.router.navigate(['/home']);
      }
    }

    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` :
        error.error_description ? error.error_description : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}