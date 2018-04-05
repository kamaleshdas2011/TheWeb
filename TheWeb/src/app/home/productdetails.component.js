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
var ProductDetailsComponent = (function () {
    function ProductDetailsComponent(_imgService, _elm, _rend, _prodService, _activateroute, _storeService) {
        this._imgService = _imgService;
        this._elm = _elm;
        this._rend = _rend;
        this._prodService = _prodService;
        this._activateroute = _activateroute;
        this._storeService = _storeService;
        this.visible = 'prod-img-visible';
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var prodid = this._activateroute.snapshot.params['id'];
        this._prodService.getProductDetails(prodid)
            .subscribe(function (response) {
            _this.product = response;
            //console.log(this.product);
            _this._imgService.getProductImages(_this.product.ProductID, 'Details').subscribe(function (imgData) {
                _this.images = imgData;
            }, function (error1) {
                console.log("Error happened" + error1);
                if (error1.status === '401') {
                    _this.statusMessage = 'Session expired, please login again.';
                }
            });
        }, function (error) {
            console.log("Error happened" + error);
            if (error.status === '401') {
                _this.statusMessage = 'Session expired, please login again.';
            }
        });
    };
    ProductDetailsComponent.prototype.displayImage = function (index) {
        //hide active image
        var activeImage = this._elm.nativeElement.querySelector(".prod-img-visible");
        this._rend.removeClass(activeImage, 'prod-img-visible');
        this._rend.addClass(activeImage, 'prod-img-hide');
        //show clicked image
        var input = this._elm.nativeElement.querySelector('#image-' + index);
        this._rend.removeClass(input, 'prod-img-hide');
        this._rend.addClass(input, 'prod-img-visible');
    };
    ProductDetailsComponent.prototype.addToCart = function (product) {
        var itemCount = this._elm.nativeElement.querySelector('#prodqty').value;
        this._storeService.storeCart(product, itemCount);
        $('#alertAddCart').show('fade');
    };
    ProductDetailsComponent.prototype.clickWish = function (prod) {
        if (this._storeService.presentInWishlist(prod.ProductID)) {
            $('#alertWishRemove').show('fade');
            $('#alertWishAdd').hide('fade');
        }
        else {
            $('#alertWishAdd').show('fade');
            $('#alertWishRemove').hide('fade');
        }
        this._storeService.storeWish(prod);
    };
    return ProductDetailsComponent;
}());
ProductDetailsComponent = __decorate([
    core_1.Component({
        selector: 'product-details',
        templateUrl: 'app/home/productdetails.component.html',
        styleUrls: ['app/home/productdetails.component.css'],
    }),
    __metadata("design:paramtypes", [image_service_1.ImageService,
        core_1.ElementRef,
        core_1.Renderer2,
        product_service_1.ProductService,
        router_1.ActivatedRoute,
        storage_service_1.StorageService])
], ProductDetailsComponent);
exports.ProductDetailsComponent = ProductDetailsComponent;
//# sourceMappingURL=productdetails.component.js.map