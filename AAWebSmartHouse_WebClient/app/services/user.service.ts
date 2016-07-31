import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http'
import { Observable }     from 'rxjs/Observable';
import { LocalStorageService } from './localStorage.service';
import { AppSettings } from '../app.settings';

@Injectable()
export class UserService {
    settings = AppSettings.UserServiceSettings;
    isLoggedIn = false;

    constructor(private http: Http, private localStorageService: LocalStorageService) { }

    register(
        email: string,
        password: string,
        confirmPassword: string,
        firstname: string,
        lastname: string
    ): Observable<Object> {

        let body = JSON.stringify({ email, password, confirmPassword, firstname, lastname });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers })

        return this.http.post(this.settings.apiUrl + this.settings.registerUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getToken(email: string, password: string) {
        let body = "username=" + email + "&password=" + password + "&grant_type=password";
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.settings.apiUrl + this.settings.tokenUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUserData(token: string){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);

        let options = new RequestOptions({ headers: headers });

        let request = this.http.get(this.settings.apiUrl + this.settings.userUrl, { headers })
            .map(this.extractData)
            .catch(this.handleError);
        
        return request;
    }

    isTokenAvailable(): boolean {
        return this.localStorageService.hasItem(this.settings.tokenKeyName);
    }

    isUserLoggedIn():boolean {
        if (this.isTokenAvailable()) {
            this.getUserData(this.token)
            .subscribe(res => {
                this.spanText = JSON.stringify(res);
            })

        }else{
            return false;
        }
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        console.error("!!ERROR!!: " + JSON.stringify(error));
        return Observable.throw(errMsg);
    }
}