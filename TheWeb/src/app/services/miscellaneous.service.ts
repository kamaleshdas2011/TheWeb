import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class MiscellaneousService {
    private API_KEY: string = 'AIzaSyAVT-NFAvPYpCp0Jv1ASW-oMN9gKeVg0oc';
    
    getAddress(pin: string) {
        return this._http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + pin + '&key=' + this.API_KEY)
            .map((response: Response) => {
                //console.log(response.json().results[0]);
                return response.json();
            })
    }
    constructor(private _http: Http) {

    }
}

