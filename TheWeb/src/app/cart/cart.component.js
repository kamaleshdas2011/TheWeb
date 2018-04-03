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
var image_service_1 = require("../services/image.service");
var product_service_1 = require("../services/product.service");
var router_1 = require("@angular/router");
var storage_service_1 = require("../services/storage.service");
var miscellaneous_service_1 = require("../services/miscellaneous.service");
var CartComponent = (function () {
    function CartComponent(_imgService, _elm, _rend, _prodService, _activateroute, _storeService, _misService) {
        this._imgService = _imgService;
        this._elm = _elm;
        this._rend = _rend;
        this._prodService = _prodService;
        this._activateroute = _activateroute;
        this._storeService = _storeService;
        this._misService = _misService;
        this.cart = [];
    }
    CartComponent.prototype.removeFromCart = function (prod) {
        this._storeService.storeCart(prod, 0);
        this.cart = this._storeService.pullCart();
        this.cartSum = this._storeService.getCartSum();
    };
    CartComponent.prototype.changeNumber = function (prod, count) {
        var finalCount = 0;
        var str = prod.CartCount.toString();
        if (count == -1) {
            finalCount = parseInt(str) - 1;
        }
        else if (count == 1) {
            finalCount = parseInt(str) + 1;
        }
        //console.log(finalCount);
        this._storeService.storeCart(prod, finalCount);
        this.cart = this._storeService.pullCart();
        this.cartSum = this._storeService.getCartSum();
    };
    CartComponent.prototype.checkPin = function () {
        var _this = this;
        console.log(this.pincode);
        this._misService.getAddress(this.pincode)
            .subscribe(function (response) {
            _this.address = response.results[0].formatted_address;
            //console.log(this.address);
        }, function (error) {
            console.log("Error happened" + error);
        });
        ;
    };
    CartComponent.prototype.ngOnInit = function () {
        this.cart = this._storeService.pullCart();
        this.cartSum = this._storeService.getCartSum();
    };
    return CartComponent;
}());
CartComponent = __decorate([
    core_1.Component({
        selector: 'cart-page',
        templateUrl: 'app/cart/cart.component.html',
        styleUrls: ['app/cart/cart.component.css',],
    }),
    __metadata("design:paramtypes", [image_service_1.ImageService,
        core_1.ElementRef,
        core_1.Renderer2,
        product_service_1.ProductService,
        router_1.ActivatedRoute,
        storage_service_1.StorageService,
        miscellaneous_service_1.MiscellaneousService])
], CartComponent);
exports.CartComponent = CartComponent;
//# sourceMappingURL=cart.component.js.map