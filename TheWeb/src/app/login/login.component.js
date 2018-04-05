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
//import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
var LoginComponent = (function () {
    function LoginComponent(_fb, _authService, _elm, _rend) {
        this._fb = _fb;
        this._authService = _authService;
        this._elm = _elm;
        this._rend = _rend;
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        var email = this.loginForm.get('email').value;
        var password = this.loginForm.get('password').value;
        this._authService.authenticate(email, password)
            .subscribe(function (data) {
            _this.statusMessage = "Login successful.";
            //this.store(data);
            location.reload();
        }, function (error) {
            console.log("Error happened. " + error);
            _this.statusMessage = "Something went wrong. Try agin after sometime";
        });
    };
    LoginComponent.prototype.googlesign = function () {
        window.location.href = 'http://localhost:49959/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A3000&state=qZyaWwj_FWNiM0GtwFno9Z40kOY1lwVjDJAFvVy5o3I1';
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this._fb.group({
            email: ['', [forms_1.Validators.required]],
            password: ['', [forms_1.Validators.required]]
        });
        if (location.hash) {
            if (location.hash.split('access_token=')) {
                var accessToken = location.hash.split('access_token=')[1].split('&')[0];
                if (accessToken) {
                    this._authService.isUserRegistered(accessToken);
                }
            }
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login-popup',
        templateUrl: 'app/login/login.component.html',
        styleUrls: ['app/login/login.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        authentication_service_1.AuthenticationService,
        core_1.ElementRef,
        core_1.Renderer2])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map