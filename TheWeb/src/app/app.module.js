"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var productdetails_component_1 = require("./home/productdetails.component");
var pagenotfound_component_1 = require("./others/pagenotfound.component");
var image_service_1 = require("./services/image.service");
var home_service_1 = require("./services/home.service");
var product_service_1 = require("./services/product.service");
var footer_component_1 = require("./footer.component");
var header_component_1 = require("./header.component");
var login_component_1 = require("./login/login.component");
var forms_1 = require("@angular/forms");
var register_component_1 = require("./login/register.component");
var authentication_service_1 = require("./services/authentication.service");
var storage_service_1 = require("./services/storage.service");
var cart_component_1 = require("./cart/cart.component");
var miscellaneous_service_1 = require("./services/miscellaneous.service");
var account_component_1 = require("./account/account.component");
//import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
var appRoutes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'productdetails/:id', component: productdetails_component_1.ProductDetailsComponent },
    { path: 'cart', component: cart_component_1.CartComponent },
    { path: 'account', component: account_component_1.AccountComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: pagenotfound_component_1.PageNotFoundComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, router_1.RouterModule.forRoot(appRoutes),
                forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, cart_component_1.CartComponent,
                productdetails_component_1.ProductDetailsComponent, pagenotfound_component_1.PageNotFoundComponent,
                footer_component_1.FooterComponent, header_component_1.HeaderComponent,
                login_component_1.LoginComponent, register_component_1.RegisterComponent, account_component_1.AccountComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [image_service_1.ImageService, home_service_1.HomeService, product_service_1.ProductService,
                authentication_service_1.AuthenticationService, storage_service_1.StorageService, miscellaneous_service_1.MiscellaneousService],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map