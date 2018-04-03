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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var storage_service_1 = require("./services/storage.service");
var router_1 = require("@angular/router");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(_storageService, _route, _router) {
        this._storageService = _storageService;
        this._route = _route;
        this._router = _router;
        this.cart = [];
        this.wish = [];
        if (localStorage.getItem('access_token') != null) {
            this.access_token = JSON.parse(localStorage.getItem('access_token'));
            this.userName = this.access_token.userName;
        }
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.logout = function () {
        localStorage.removeItem('access_token');
        this.access_token = null;
        location.reload();
    };
    HeaderComponent.prototype.account = function () {
        $('.modal').modal('hide');
        this._router.navigate(['/account']);
        //console.log(this.access_token.userName);
    };
    HeaderComponent.prototype.cartPopup = function () {
        this.cart = this._storageService.pullCart();
        this.cartSum = this._storageService.getCartSum();
        setTimeout(function () {
            $('#cartPop').modal('show');
        }, 230);
    };
    HeaderComponent.prototype.wishPopup = function () {
        this.wish = this._storageService.pullWish();
        this.wishSum = this._storageService.getWishSum();
        setTimeout(function () {
            $('#wishPop').modal('show');
        }, 230);
    };
    HeaderComponent.prototype.gocart = function () {
        $('.modal').modal('hide');
        this._router.navigate(['/cart']);
    };
    HeaderComponent.prototype.removeFromCart = function (prod) {
        this._storageService.storeCart(prod, 0);
        this.cart = this._storageService.pullCart();
        this.cartSum = this._storageService.getCartSum();
    };
    HeaderComponent.prototype.removeFromWish = function (prod) {
        this._storageService.storeWish(prod);
        this.wish = this._storageService.pullWish();
        this.wishSum = this._storageService.getWishSum();
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'page-header',
            templateUrl: 'app/header.component.html',
            styleUrls: ['app/css/header.css']
        }),
        __metadata("design:paramtypes", [storage_service_1.StorageService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map