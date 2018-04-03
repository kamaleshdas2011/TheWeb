import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Product } from '../classes/product';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProductService {
    private prod: Product;
    header: Headers;
    options: RequestOptions;

    getProductDetails(id: string) {
        //console.log(localStorage.getItem('access_token'));
        this.prod = new Product();
        return this._http.get('http://localhost:49959/api/product/' + id, this.options)
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
                headers: this.header
            })
        }
        
        
    }
}

