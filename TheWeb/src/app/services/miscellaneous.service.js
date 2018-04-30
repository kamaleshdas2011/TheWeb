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
var MiscellaneousService = (function () {
    function MiscellaneousService(_http, _storeService) {
        this._http = _http;
        this._storeService = _storeService;
        this.API_KEY = 'AIzaSyCHXdf_OAgvy58e0Ftz0pW1Zb1xF8GsFjk';
        this.LoginPopupStatus = true;
        this.isLoggedin = false;
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.header = new http_1.Headers({
                'Authorization': 'Bearer ' + this.access_token
            });
            this.options = new http_1.RequestOptions({
                headers: this.header
            });
        }
    }
    MiscellaneousService.prototype.getAddress = function (pin) {
        return this._http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + pin + '&key=' + this.API_KEY)
            .map(function (response) {
            //console.log(response.json().results[0]);
            return response.json();
        });
    };
    MiscellaneousService.prototype.getLoginPopupStatus = function () {
        return this.LoginPopupStatus;
    };
    MiscellaneousService.prototype.changeLoginPopupStatus = function () {
        this.LoginPopupStatus = !this.LoginPopupStatus;
    };
    MiscellaneousService.prototype.getLoginStatus = function () {
        return this.isLoggedin;
    };
    MiscellaneousService.prototype.changeLoginStatus = function (status) {
        this.isLoggedin = status;
    };
    MiscellaneousService.prototype.checkCoupon = function (coupon) {
        return this._http.get('http://localhost:49959/api/miscellaneous/validatecoupon/' + coupon)
            .map(function (response) {
            //console.log(response.json());
            return response.json();
        });
    };
    return MiscellaneousService;
}());
MiscellaneousService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, storage_service_1.StorageService])
], MiscellaneousService);
exports.MiscellaneousService = MiscellaneousService;
//# sourceMappingURL=miscellaneous.service.js.map