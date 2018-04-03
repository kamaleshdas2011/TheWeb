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
var StorageService = (function () {
    function StorageService(_http) {
        this._http = _http;
    }
    //access_token//
    StorageService.prototype.store_access_token = function (body) {
        localStorage.setItem('access_token', JSON.stringify(body));
    };
    StorageService.prototype.pull_access_token = function () {
        var access_token;
        if (localStorage.getItem('access_token') != null) {
            access_token = JSON.parse(localStorage.getItem('access_token'));
        }
        return access_token;
    };
    //cart//
    StorageService.prototype.storeCart = function (product, count) {
        var cart = [];
        if (localStorage.getItem('cart_items')) {
            cart = JSON.parse(localStorage.getItem('cart_items'));
            if (cart.find(function (m) { return m.ProductID == product.ProductID; })) {
                // update Qty if product is already present
                if (count == 0) {
                    var index = cart.findIndex(function (order) { return order.ProductID == product.ProductID; });
                    cart.splice(index, 1);
                }
                else {
                    for (var i in cart) {
                        if (cart[i].ProductID == product.ProductID) {
                            cart[i].CartCount = count; // replace existing Qty
                        }
                    }
                }
            }
            else {
                product.CartCount = count;
                cart.push(product);
            }
        }
        else {
            product.CartCount = count;
            cart.push(product);
        }
        //console.log(cart);
        localStorage.setItem('cart_items', JSON.stringify(cart));
    };
    StorageService.prototype.pullCart = function () {
        var cart = [];
        if (localStorage.getItem('cart_items')) {
            cart = JSON.parse(localStorage.getItem('cart_items'));
        }
        //console.log(cart);
        return cart;
    };
    StorageService.prototype.getCartCount = function () {
        var count = 0;
        if (localStorage.getItem('cart_items')) {
            var cart = JSON.parse(localStorage.getItem('cart_items'));
            count = cart.length;
        }
        return count;
    };
    StorageService.prototype.getCartSum = function () {
        var sum = 0;
        if (localStorage.getItem('cart_items')) {
            var cart = JSON.parse(localStorage.getItem('cart_items'));
            for (var i = 0; i < cart.length; i++) {
                //console.log(cart[i].ProductPrice)
                sum = sum + (cart[i].ProductPrice * cart[i].CartCount);
            }
        }
        return sum;
    };
    //wishlist//
    StorageService.prototype.storeWish = function (product) {
        var wish = [];
        if (localStorage.getItem('wish_items')) {
            wish = JSON.parse(localStorage.getItem('wish_items'));
            if (wish.find(function (m) { return m.ProductID == product.ProductID; })) {
                var index = wish.findIndex(function (order) { return order.ProductID == product.ProductID; });
                wish.splice(index, 1);
            }
            else {
                wish.push(product);
            }
        }
        else {
            wish.push(product);
        }
        //console.log(cart);
        localStorage.setItem('wish_items', JSON.stringify(wish));
    };
    StorageService.prototype.pullWish = function () {
        var wish = [];
        if (localStorage.getItem('wish_items')) {
            wish = JSON.parse(localStorage.getItem('wish_items'));
        }
        //console.log(cart);
        return wish;
    };
    StorageService.prototype.getWishCount = function () {
        var count = 0;
        if (localStorage.getItem('wish_items')) {
            var wish = JSON.parse(localStorage.getItem('wish_items'));
            count = wish.length;
        }
        return count;
    };
    StorageService.prototype.getWishSum = function () {
        var sum = 0;
        if (localStorage.getItem('wish_items')) {
            var cart = JSON.parse(localStorage.getItem('wish_items'));
            for (var i = 0; i < cart.length; i++) {
                //console.log(cart[i].ProductPrice)
                sum = sum + cart[i].ProductPrice;
            }
        }
        return sum;
    };
    StorageService.prototype.presentInWishlist = function (productid) {
        var wish = [];
        if (localStorage.getItem('wish_items')) {
            wish = JSON.parse(localStorage.getItem('wish_items'));
            if (wish.find(function (m) { return m.ProductID == productid; })) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    return StorageService;
}());
StorageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map