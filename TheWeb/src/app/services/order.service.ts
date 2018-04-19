import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from '../classes/user';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';
import { Order } from '../classes/Order';

@Injectable()
export class OrderService {
    private header: Headers;
    private options: RequestOptions;
    private access_token: any;
    Order: Order;

    constructor(private _http: Http, private _authService: AuthenticationService,
        private _storeService: StorageService,
    )
    {
        this.Order = new Order();

        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;

            this.header = new Headers({
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json',
            });
            this.options = new RequestOptions({
                headers: this.header
            })
        }
    }
}

