"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var storage_service_1 = require("./storage.service");
var AuthenticationService = (function () {
    function AuthenticationService(_http, _storeService) {
        this._http = _http;
        this._storeService = _storeService;
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
        }
    }
    AuthenticationService.prototype.register = function (email, pass, conpass) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var model = {
            'Email': email,
            'Password': pass,
            'ConfirmPassword': conpass,
        };
        //console.log("wed");
        return this._http.post('http://localhost:49959/api/account/register', model, options)
            .map(function (response) {
            //console.log(response);
            return response.status;
        });
    };
    AuthenticationService.prototype.authenticate = function (email, pass) {
        //console.log('user-' + email);
        //console.log('pass-' + pass);
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        var model = "username=" + email + "&password=" + pass + "&grant_type=password";
        return this._http.post('http://localhost:49959/token', model, options)
            .map(function (response) {
            return response.json();
        });
    };
    AuthenticationService.prototype.logout = function () {
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.access_token, });
        var options = new http_1.RequestOptions({ headers: headers });
        //console.log("wed");
        return this._http.post('http://localhost:49959/api/account/logout', options)
            .map(function (response) {
            console.log(response);
            return response.status;
        });
    };
    AuthenticationService.prototype.isUserRegistered = function (access_token) {
        var header = new http_1.Headers({
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({
            headers: header
        });
        return this._http.get('http://localhost:49959/api/account/userinfo', options)
            .map(function (response) {
            //console.log(response);
            return response.json();
        });
    };
    AuthenticationService.prototype.getAccountInfo = function () {
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
        }
        var header = new http_1.Headers({
            'Authorization': 'Bearer ' + this.access_token,
        });
        var options = new http_1.RequestOptions({
            headers: header
        });
        return this._http.get('http://localhost:49959/api/account/accountinfo', options)
            .map(function (response) {
            //console.log(response.json())
            return response.json();
        });
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, storage_service_1.StorageService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map