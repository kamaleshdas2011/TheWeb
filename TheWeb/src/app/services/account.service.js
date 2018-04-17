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
var authentication_service_1 = require("./authentication.service");
var storage_service_1 = require("./storage.service");
var AccountService = (function () {
    function AccountService(_http, _authService, _storeService) {
        this._http = _http;
        this._authService = _authService;
        this._storeService = _storeService;
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            //console.log(this.access_token)
            this.header = new http_1.Headers({
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json',
            });
            this.options = new http_1.RequestOptions({
                headers: this.header
            });
        }
    }
    AccountService.prototype.updateUserData = function (formData) {
        var _this = this;
        var model = formData;
        //console.log(this.options)
        return this._http.post('http://localhost:49959/api/account/editaccount', model, this.options)
            .map(function (response) {
            _this._authService.getAccountInfo().subscribe(function (userdata) {
                _this._storeService.storeInSessionStorage(userdata, 'user_info');
            }, function (error) {
                console.error(error);
            });
            return response.status;
        });
    };
    AccountService.prototype.getAllAddress = function () {
        return this._http.get('http://localhost:49959/api/account/getalladdress', this.options)
            .map(function (response) {
            //console.log(response.json())
            return response.json();
        });
    };
    AccountService.prototype.addNewAddress = function (formData) {
        return this._http.post('http://localhost:49959/api/account/addnewaddress', formData, this.options)
            .map(function (response) {
            return response.json();
        });
    };
    AccountService.prototype.getAddressTypes = function () {
        return this._http.get('http://localhost:49959/api/account/getaddresstypes', this.options)
            .map(function (response) {
            //console.log(response.json())
            return response.json();
        });
    };
    AccountService.prototype.getStates = function () {
        return this._http.get('http://localhost:49959/api/account/getstates', this.options)
            .map(function (response) {
            //console.log(response.json())
            return response.json();
        });
    };
    return AccountService;
}());
AccountService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthenticationService,
        storage_service_1.StorageService])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map