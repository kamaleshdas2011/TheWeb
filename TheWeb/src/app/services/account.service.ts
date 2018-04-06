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
        //console.log(this.options)
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
    access_token: any;
    constructor(private _http: Http, private _authService: AuthenticationService,
        private _storeService: StorageService, ) {

        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            //console.log(this.access_token)

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

