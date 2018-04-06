import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Image } from '../classes/image';
import { Options } from 'selenium-webdriver/chrome';
import { StorageService } from './storage.service';

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
    access_token: any;
    constructor(private _http: Http, private _storeService: StorageService,) {
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.header = new Headers({
                'Authorization': 'Bearer ' + this.access_token
            });
            this.options = new RequestOptions({
                headers: this.header,
            })
        }
        
    }
}

