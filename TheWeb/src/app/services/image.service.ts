import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Image } from '../classes/image';
import { Options } from 'selenium-webdriver/chrome';

@Injectable()
export class ImageService {
    private images: Image[] = [];
    header: Headers;
    options: RequestOptions;
    getProductImages(prodid: string, imageType: string) {
        //console.log(localStorage.getItem('access_token'));
        return this._http.get('http://localhost:49959/api/image/' + prodid + '?imageType=' + imageType, this.options)
            .map((response: Response) => {
                //console.log(response.status);
                return response.json();
            })

    }
    constructor(private _http: Http) {
        let access_token;
        if (localStorage.getItem('access_token') != null) {
            access_token = JSON.parse(localStorage.getItem('access_token'));
            this.header = new Headers({
                'Authorization': 'Bearer ' + access_token.access_token
            });
            this.options = new RequestOptions({
                headers: this.header,
            })
        }
        
    }
}

