import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http'
import { Observable }     from 'rxjs/Observable';
import { LocalStorageService } from './localStorage.service'

@Injectable()
export class UserService {
    private tokenKeyName = "Token";
    private apiUrl = "http://localhost:51934/";
    private registerUrl = this.apiUrl + "api/Account/Register";
    private tokenUrl = this.apiUrl + "api/Account/GetToken";
    private userInfoUrl = this.apiUrl + "api/Account/UserInfo";
    private userUrl = this.apiUrl + "api/User";
    private logoutUrl = this.apiUrl + "api/Account/Logout";

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

        return this.http.post(this.registerUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getToken(email: string, password: string) {
        let body = "username=" + email + "&password=" + password + "&grant_type=password";
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.tokenUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    isTokenValid(token: string){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);

        let options = new RequestOptions({ headers: headers });
        options.method = "GET"
        console.log("options: " + JSON.stringify(options));


        let request = this.http.request(this.userUrl, { headers })
            .map(this.extractData)
            .catch(this.handleError);
        
        return request;
    }

    isTokenAvailable(): boolean {
        return this.localStorageService.hasItem(this.tokenKeyName);
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