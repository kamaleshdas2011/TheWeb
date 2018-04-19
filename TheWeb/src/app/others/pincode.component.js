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
var PincodeComponent = (function () {
    function PincodeComponent(_imgService, _elm, _rend, _prodService, _activateroute, _storeService, _misService, _route, _router) {
        this._imgService = _imgService;
        this._elm = _elm;
        this._rend = _rend;
        this._prodService = _prodService;
        this._activateroute = _activateroute;
        this._storeService = _storeService;
        this._misService = _misService;
        this._route = _route;
        this._router = _router;
        this.address = new core_1.EventEmitter;
        this.delCharge = new core_1.EventEmitter;
    }
    PincodeComponent.prototype.checkPin = function () {
        var _this = this;
        //console.log(this.pincode);
        this._misService.getAddress(this.pincode)
            .subscribe(function (response) {
            _this.address = response.results[0].formatted_address;
            //this.address.emit();
            _this._storeService.storeInLocalStorage(_this.pincode, 'pincode');
            _this.getDeliveryCharge();
            //console.log(this.address);
        }, function (error) {
            console.log("Error happened" + error);
        });
    };
    PincodeComponent.prototype.getDeliveryCharge = function () {
        //this.delCharge=
        this.delCharge.emit(this._prodService.getDeliveryCharge(this.pincode));
    };
    PincodeComponent.prototype.ngOnInit = function () {
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.userinfo = this._storeService.pullFromSessionStorage('user_info');
        }
        if (this._storeService.pullFromLocalStorage('pincode')) {
            this.pincode = this._storeService.pullFromLocalStorage('pincode');
            this.checkPin();
        }
        else {
            this.address = null;
        }
    };
    return PincodeComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PincodeComponent.prototype, "address", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PincodeComponent.prototype, "delCharge", void 0);
PincodeComponent = __decorate([
    core_1.Component({
        selector: 'check-pincode',
        templateUrl: 'app/others/pincode.component.html',
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
], PincodeComponent);
exports.PincodeComponent = PincodeComponent;
//# sourceMappingURL=pincode.component.js.map