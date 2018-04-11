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
var product_1 = require("../classes/product");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var storage_service_1 = require("./storage.service");
var ProductService = (function () {
    function ProductService(_http, _storeService) {
        this._http = _http;
        this._storeService = _storeService;
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
    ProductService.prototype.getProductDetails = function (id) {
        //console.log(localStorage.getItem('access_token'));
        this.prod = new product_1.Product();
        return this._http.get('http://localhost:49959/api/product/' + id, this.options)
            .map(function (response) {
            return response.json();
        });
    };
    ProductService.prototype.getProducts = function (take, skip) {
        this.prod = new product_1.Product();
        return this._http.get('http://localhost:49959/api/product/getproducts/' + take + '/' + skip, this.options)
            .map(function (response) {
            //console.log(response.json());
            return response.json();
        });
    };
    ProductService.prototype.search = function (term) {
        var prodlist = this._http.get('http://localhost:49959/api/product/productsearch/term' + '?term=' + term)
            .map(function (r) { return (r.json().length != 0 ? r.json() : [{ "ClientId": 0, "ClientName": "No Record Found" }]); });
        return prodlist;
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, storage_service_1.StorageService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map