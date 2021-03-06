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
var user_1 = require("../classes/user");
var AcBasicComponent = (function () {
    function AcBasicComponent(_imgService, _elm, _rend, _prodService, _activateroute, _storeService, _misService, _fb, _authService, _acService) {
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
    }
    AcBasicComponent.prototype.ngOnInit = function () {
        this.user = new user_1.User();
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.user = this._storeService.pullFromSessionStorage('user_info');
        }
        this.acForm = this._fb.group({
            Email: [this.user.Email, [forms_1.Validators.required]],
            FirstName: [this.user.FirstName],
            LastName: [this.user.LastName],
            MiddleName: [this.user.MiddleName],
            PhoneNumber: [this.user.PhoneNumber]
        });
    };
    AcBasicComponent.prototype.enableText = function (name) {
        var cont = this._elm.nativeElement.querySelector("#" + name);
        this._rend.removeAttribute(cont, 'readonly');
        var element = this._rend.selectRootElement("#" + name);
        setTimeout(function () { return element.focus(); }, 0);
    };
    AcBasicComponent.prototype.updatebasicinfo = function () {
        var _this = this;
        var formValue = this.acForm.value;
        this._acService.updateUserData(formValue)
            .subscribe(function (data) {
            _this.statusMessage = "Update successful.";
        }, function (error) {
            console.log("Error happened. " + error);
            _this.statusMessage = "Something went wrong. Try agin after sometime";
        });
    };
    return AcBasicComponent;
}());
AcBasicComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/account/acBasic.component.html',
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
], AcBasicComponent);
exports.AcBasicComponent = AcBasicComponent;
//# sourceMappingURL=acBasic.component.js.map