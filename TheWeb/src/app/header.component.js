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
var storage_service_1 = require("./services/storage.service");
var router_1 = require("@angular/router");
var user_1 = require("./classes/user");
var authentication_service_1 = require("./services/authentication.service");
var rxjs_1 = require("rxjs");
var product_service_1 = require("./services/product.service");
var HeaderComponent = (function () {
    function HeaderComponent(_storageService, _route, _router, _storeService, _authService, _prodService) {
        this._storageService = _storageService;
        this._route = _route;
        this._router = _router;
        this._storeService = _storeService;
        this._authService = _authService;
        this._prodService = _prodService;
        this.cart = [];
        this.wish = [];
        this.searchTerms = new rxjs_1.Subject();
        this.ProdName = '';
        this.flag = true;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = new user_1.User();
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.user = this._storeService.pullFromSessionStorage('user_info');
        }
        this.prodlist = this.searchTerms
            .debounceTime(300) // wait for 300ms pause in events  
            .distinctUntilChanged() // ignore if next search term is same as previous  
            .switchMap(function (term) { return term // switch to new observable each time  
            ? _this._prodService.search(term)
            : rxjs_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: real error handling  
            console.log(error);
            return rxjs_1.Observable.of([]);
        });
    };
    HeaderComponent.prototype.openSearch = function () {
        //document.getElementById('searchbox').focus();
        //document.getElementById('searchbox').value = '';;
        document.getElementById("myOverlay").style.display = "block";
        //$('.search').val('');
        //$('.search').focus();
        //document.getElementById('#searchbox').value = '';
        //this.flag = false;
    };
    HeaderComponent.prototype.closeSearch = function () {
        document.getElementById("myOverlay").style.display = "none";
    };
    // Push a search term into the observable stream.  
    HeaderComponent.prototype.searchProd = function (term) {
        this.flag = true;
        this.searchTerms.next(term);
    };
    HeaderComponent.prototype.onselectProd = function (prod) {
        document.getElementById("myOverlay").style.display = "none";
        //this._router.navigate(['/productdetails', prod.ProductID]);
        this._router.navigate(['/productdetails', '1']);
    };
    HeaderComponent.prototype.logout = function () {
        //this._authService.logout().subscribe((data) => {
        //}, (error) => console.log(error));
        this._storageService.remove_access_token();
        this._storeService.removeFromSessionStorage('user_info');
        this.access_token = null;
        location.reload();
    };
    HeaderComponent.prototype.account = function () {
        $('.modal').modal('hide');
        this._router.navigate(['/account/basicinfo']);
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
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'page-header',
        templateUrl: 'app/header.component.html',
        styleUrls: ['app/css/header.css']
    }),
    __metadata("design:paramtypes", [storage_service_1.StorageService,
        router_1.ActivatedRoute,
        router_1.Router,
        storage_service_1.StorageService,
        authentication_service_1.AuthenticationService,
        product_service_1.ProductService])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map