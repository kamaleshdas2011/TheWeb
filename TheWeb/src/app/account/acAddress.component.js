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
var forms_1 = require("@angular/forms");
var authentication_service_1 = require("../services/authentication.service");
var account_service_1 = require("../services/account.service");
var AcAddressComponent = (function () {
    function AcAddressComponent(_imgService, _elm, _rend, _prodService, _activateroute, _storeService, _misService, _fb, _authService, _acService) {
        this._imgService = _imgService;
        this._elm = _elm;
        this._rend = _rend;
        this._prodService = _prodService;
        this._activateroute = _activateroute;
        this._storeService = _storeService;
        this._misService = _misService;
        this._fb = _fb;
        this._authService = _authService;
        this._acService = _acService;
        this.addnewaddress = false;
        this.stateSelection = 0;
    }
    AcAddressComponent.prototype.ngOnInit = function () {
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.userinfo = this._storeService.pullFromSessionStorage('user_info');
        }
        this.getAllAddress();
        this.getAddressTypes();
        this.getStates();
        this.acForm = this._fb.group({
            Name: [''],
            PhoneNumber: [''],
            City: [''],
            AddressLine1: [''],
            AddressLine2: [''],
            StateProvinceID: [''],
            PostalCode: [''],
            AddressTypeID: [''],
            Landmark: [''],
            AlternatePhoneNumber: [''],
        });
    };
    //onAddressTypeSelectionChange(entry: any) {
    //    this.addTypeSelection = entry;
    //    //console.log(this.addTypeSelection);
    //}
    //onStateSelectionChange(entry: any) {
    //    console.log(entry);
    //    //this.stateSelection = entry;
    //}
    AcAddressComponent.prototype.getAddressTypes = function () {
        var _this = this;
        this._acService.getAddressTypes()
            .subscribe(function (data) {
            _this.addresstypes = data;
        }, function (error) {
            console.log("Error happened. " + error);
        });
    };
    AcAddressComponent.prototype.getStates = function () {
        var _this = this;
        this._acService.getStates()
            .subscribe(function (data) {
            _this.states = data;
        }, function (error) {
            console.log("Error happened. " + error);
        });
    };
    AcAddressComponent.prototype.getAllAddress = function () {
        var _this = this;
        this._acService.getAllAddress()
            .subscribe(function (data) {
            _this.useraddress = data;
        }, function (error) {
            console.log("Error happened. " + error);
        });
    };
    AcAddressComponent.prototype.addNewAddress = function () {
        var _this = this;
        console.log(this.addTypeSelection);
        console.log(this.stateSelection);
        var formValue = this.acForm.value;
        console.log(formValue);
        this._acService.addNewAddress(formValue)
            .subscribe(function (data) {
            _this.statusMessage = "Successfully added";
            _this.addnewaddress = false;
            _this.getAllAddress();
            _this.acForm.reset();
        }, function (error) {
            console.log("Error happened. " + error);
            _this.statusMessage = "Something went wrong. Try agin after sometime";
        });
    };
    AcAddressComponent.prototype.pinonblur = function () {
        var _this = this;
        //console.log(this.pincode);
        var state;
        var city;
        this._misService.getAddress(this.pincode)
            .subscribe(function (response) {
            var address = response.results[0].address_components;
            $.each(address, function (i, v) {
                $.each(v.types, function (f, g) {
                    //console.log(g);
                    if (g == 'administrative_area_level_1') {
                        state = v.short_name;
                    }
                    if (g == 'locality') {
                        city = v.short_name;
                    }
                });
            });
            //this.stateSelection = state;
            //this.acForm.setValue({ City: city });
            _this.acForm.get('City').setValue(city);
            _this.acForm.get('StateProvinceID').setValue(state);
        }, function (error) {
            console.log("Error happened" + error);
        });
    };
    return AcAddressComponent;
}());
AcAddressComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/account/acAddress.component.html',
        styleUrls: ['app/account/account.component.css',]
    }),
    __metadata("design:paramtypes", [image_service_1.ImageService,
        core_1.ElementRef,
        core_1.Renderer2,
        product_service_1.ProductService,
        router_1.ActivatedRoute,
        storage_service_1.StorageService,
        miscellaneous_service_1.MiscellaneousService,
        forms_1.FormBuilder,
        authentication_service_1.AuthenticationService,
        account_service_1.AccountService])
], AcAddressComponent);
exports.AcAddressComponent = AcAddressComponent;
//# sourceMappingURL=acAddress.component.js.map