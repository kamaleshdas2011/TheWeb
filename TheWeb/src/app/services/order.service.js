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
var Order_1 = require("../classes/Order");
var OrderService = (function () {
    function OrderService(_http, _authService, _storeService) {
        this._http = _http;
        this._authService = _authService;
        this._storeService = _storeService;
        this.Order = new Order_1.Order();
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.header = new http_1.Headers({
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json',
            });
            this.options = new http_1.RequestOptions({
                headers: this.header
            });
        }
    }
    return OrderService;
}());
OrderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthenticationService,
        storage_service_1.StorageService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map