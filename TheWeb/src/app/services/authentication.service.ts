import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class AuthenticationService {

    register(email: string, pass: string, conpass: string) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let model = {
            'Email': email,
            'Password': pass,
            'ConfirmPassword': conpass,
        };
        //console.log("wed");
        return this._http.post('http://localhost:49959/api/account/register', model, options)
            .map((response: Response) => {
                //console.log(response);
                return response.status;
            })

    }
    authenticate(email: string, pass: string) {
        //console.log('user-' + email);
        //console.log('pass-' + pass);

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        let model = "username=" + email + "&password=" + pass + "&grant_type=password";
        return this._http.post('http://localhost:49959/token', model, options)
            .map((response: Response) => {
                //console.log(response.json());
                return response.json();
            })

    }
    isUserRegistered(access_token: string) {
        let header = new Headers({
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({
            headers: header
        })
        return this._http.get('http://localhost:49959/api/account/userinfo', options)
            .map((response: Response) => {
                console.log(response);
                return response.json();
            })
    }
    constructor(private _http: Http) {

    }
}

