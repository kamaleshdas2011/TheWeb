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
var forms_1 = require("@angular/forms");
var authentication_service_1 = require("../services/authentication.service");
var miscellaneous_service_1 = require("../services/miscellaneous.service");
var animations_1 = require("@angular/animations");
var RegisterComponent = (function () {
    function RegisterComponent(_fb, _authService, _miscServ) {
        this._fb = _fb;
        this._authService = _authService;
        this._miscServ = _miscServ;
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        var email = this.registerForm.get('email').value;
        var password = this.registerForm.get('password').value;
        var password_confirmation = this.registerForm.get('password_confirmation').value;
        this._authService.register(email, password, password_confirmation)
            .subscribe(function (data) {
            if (data === 200) {
                _this.statusMessage = "Successfully registerd! You will be automatically logged in shortly.";
                setTimeout(function () {
                    _this._miscServ.changeLoginPopupStatus();
                }, 2000);
            }
            else {
                _this.statusMessage = "Something went wrong. Try agin after sometime";
            }
        }, function (error) {
            console.log("Error happened. " + error);
            _this.statusMessage = "Something went wrong. Try agin after sometime";
        });
        //console.log('u-' + email + '/n' + 'pass-' + password);
        //$('#loginModal').modal('hide');
    };
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this._fb.group({
            email: ['', [forms_1.Validators.required]],
            password: ['', [forms_1.Validators.required]],
            password_confirmation: ['', [forms_1.Validators.required]]
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register-popup',
        templateUrl: 'app/login/register.component.html',
        styleUrls: ['app/login/login.component.css'],
        animations: [
            animations_1.trigger('slideInOut', [
                animations_1.transition(':enter', [
                    animations_1.style({ transform: 'translateY(-100%)' }),
                    animations_1.animate('200ms ease-in', animations_1.style({ transform: 'translateY(0%)' }))
                ]),
                animations_1.transition(':leave', [
                    animations_1.animate('200ms ease-in', animations_1.style({ transform: 'translateY(-100%)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        authentication_service_1.AuthenticationService,
        miscellaneous_service_1.MiscellaneousService])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map