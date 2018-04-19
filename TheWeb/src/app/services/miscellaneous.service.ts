import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class MiscellaneousService {
    private API_KEY: string = 'AIzaSyCHXdf_OAgvy58e0Ftz0pW1Zb1xF8GsFjk';
    
    getAddress(pin: string) {
        return this._http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + pin + '&key=' + this.API_KEY)
            .map((response: Response) => {
                //console.log(response.json().results[0]);
                return response.json();
            })
    }
    private LoginPopupStatus: boolean = true;
    private isLoggedin: boolean = false;
    getLoginPopupStatus() {
        return this.LoginPopupStatus;
    }
    changeLoginPopupStatus() {
        this.LoginPopupStatus = !this.LoginPopupStatus;
    }
    getLoginStatus() {
        return this.isLoggedin;
    }
    changeLoginStatus(status: boolean) {
        this.isLoggedin = status;
    }
    constructor(private _http: Http) {

    }
}

