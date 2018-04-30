import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { StorageService } from './storage.service';

@Injectable()
export class MiscellaneousService {
    private API_KEY: string = 'AIzaSyCHXdf_OAgvy58e0Ftz0pW1Zb1xF8GsFjk';
    header: Headers;
    options: RequestOptions;
    access_token: any;

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
    checkCoupon(coupon: string) {
        return this._http.get('http://localhost:49959/api/miscellaneous/validatecoupon/' + coupon)
            .map((response: Response) => {
                //console.log(response.json());
                return response.json();
            });
    }
    constructor(private _http: Http, private _storeService: StorageService,) {
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.header = new Headers({
                'Authorization': 'Bearer ' + this.access_token
            });
            this.options = new RequestOptions({
                headers: this.header
            })
        }
    }
}

