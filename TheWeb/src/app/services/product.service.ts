import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Product } from '../classes/product';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';


@Injectable()
export class ProductService {
    private prod: Product;
    header: Headers;
    options: RequestOptions;
    access_token: any;

    getProductDetails(id: string) {
        //console.log(localStorage.getItem('access_token'));
        this.prod = new Product();
        return this._http.get('http://localhost:49959/api/product/' + id, this.options)
            .map((response: Response) => {
                return response.json();
            })
    }
    getProducts(take: number, skip: number) {
        this.prod = new Product();
        return this._http.get('http://localhost:49959/api/product/getproducts/' + take + '/' + skip, this.options)
            .map((response: Response) => {
                //console.log(response.json());
                return response.json();
            })
    }
    search(term: string): Observable<any[]> {
        var prodlist = this._http.get('http://localhost:49959/api/product/productsearch/term' + '?term=' + term)
            .map((r: Response) => { return (r.json().length != 0 ? r.json() : [{ "ClientId": 0, "ClientName": "No Record Found" }]) as any[] });
        return prodlist;
    }
    getDeliveryCharge(pincode: string) {
        return '100';
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

