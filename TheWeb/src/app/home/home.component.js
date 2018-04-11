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
var router_1 = require("@angular/router");
var product_service_1 = require("../services/product.service");
var HomeComponent = (function () {
    function HomeComponent(_imgService, _route, _router, _prodSrv) {
        this._imgService = _imgService;
        this._route = _route;
        this._router = _router;
        this._prodSrv = _prodSrv;
        this.images = [];
        if (localStorage.getItem('access_token') != null) {
            this.access_token = JSON.parse(localStorage.getItem('access_token'));
        }
    }
    HomeComponent.prototype.gotoProductDetails = function (id) {
        this._router.navigate(['/productdetails', id]);
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._imgService.getProductImages('1', 'Featured').subscribe(function (imgData) {
            _this.images = imgData;
            //console.log(this.images)
        }, function (error1) {
            console.log("Error happened" + error1);
        });
        //this._prodSrv.getProducts(10,0).subscribe(
        //    (imgData: any) => {
        //        this.images = imgData;
        //        //console.log(this.images)
        //    },
        //    (error1: any) => {
        //        console.log("Error happened" + error1)
        //    }
        //);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'featured-product',
        templateUrl: 'app/home/home.component.html'
    }),
    __metadata("design:paramtypes", [image_service_1.ImageService,
        router_1.ActivatedRoute,
        router_1.Router,
        product_service_1.ProductService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map