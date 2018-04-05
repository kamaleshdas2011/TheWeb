import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from '../classes/user';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';

@Injectable()
export class AccountService {
    header: Headers;
    options: RequestOptions;

    updateUserData(formData: any) {

        let model: User = formData;
        return this._http.post('http://localhost:49959/api/account/editaccount', model, this.options)
            .map((response: Response) => {
                this._authService.getAccountInfo().subscribe(
                    (userdata: any) => {
                        this._storeService.storeInLocalStorage(userdata, 'user_info');
                    },
                    (error) => {
                        console.error(error);
                    }
                )
                return response.status;
            })

    }
    constructor(private _http: Http, private _authService: AuthenticationService,
        private _storeService: StorageService, ) {
        let access_token;
        if (localStorage.getItem('access_token') != null) {
            access_token = JSON.parse(localStorage.getItem('access_token'));
            this.header = new Headers({
                'Authorization': 'Bearer ' + access_token.access_token,
                'Content-Type': 'application/json',
            });
            this.options = new RequestOptions({
                headers: this.header
            })
        }
    }
}

