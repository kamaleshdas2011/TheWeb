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
var CartCompleteComponent = (function () {
    function CartCompleteComponent(_imgService, _elm, _rend, _prodService, _activateroute, _storeService, _misService, _route, _router) {
        this._imgService = _imgService;
        this._elm = _elm;
        this._rend = _rend;
        this._prodService = _prodService;
        this._activateroute = _activateroute;
        this._storeService = _storeService;
        this._misService = _misService;
        this._route = _route;
        this._router = _router;
    }
    CartCompleteComponent.prototype.ngOnInit = function () {
        if (this._storeService.pullFromSessionStorage('order')) {
            this.Order = this._storeService.pullFromSessionStorage('order');
        }
        if (Object.keys(this.Order).length == 0) {
            this._router.navigate(['/cart/checkout/address']);
        }
    };
    return CartCompleteComponent;
}());
CartCompleteComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/cart/complete.component.html',
        styleUrls: ['app/cart/cart.component.css', 'app/cart/form.css',
            'app/cart/style.css'],
    }),
    __metadata("design:paramtypes", [image_service_1.ImageService,
        core_1.ElementRef,
        core_1.Renderer2,
        product_service_1.ProductService,
        router_1.ActivatedRoute,
        storage_service_1.StorageService,
        miscellaneous_service_1.MiscellaneousService,
        router_1.ActivatedRoute,
        router_1.Router])
], CartCompleteComponent);
exports.CartCompleteComponent = CartCompleteComponent;
//# sourceMappingURL=complete.component.js.map