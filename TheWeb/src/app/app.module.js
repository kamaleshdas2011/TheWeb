"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var animations_1 = require("@angular/platform-browser/animations");
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
var account_service_1 = require("./services/account.service");
var acAddress_component_1 = require("./account/acAddress.component");
var acBasic_component_1 = require("./account/acBasic.component");
var navbar_component_1 = require("./cart/navbar.component");
var loading_component_1 = require("./loading/loading.component");
var address_component_1 = require("./cart/address.component");
var payment_component_1 = require("./cart/payment.component");
var checkout_component_1 = require("./cart/checkout.component");
var review_component_1 = require("./cart/review.component");
var complete_component_1 = require("./cart/complete.component");
var pincode_component_1 = require("./others/pincode.component");
//import { NgxImageGalleryModule } from 'ngx-image-gallery'
//import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
var appRoutes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'productdetails/:id', component: productdetails_component_1.ProductDetailsComponent },
    { path: 'cart', component: cart_component_1.CartComponent },
    {
        path: 'cart/checkout', component: checkout_component_1.CheckoutComponent,
        children: [
            { path: 'address', component: address_component_1.CartAddressComponent },
            { path: 'payment', component: payment_component_1.CartPaymentComponent },
            { path: 'review', component: review_component_1.CartReviewComponent },
            { path: 'complete', component: complete_component_1.CartCompleteComponent },
            { path: '', redirectTo: 'cart/checkout', pathMatch: 'full' },
        ]
    },
    {
        path: 'account', component: account_component_1.AccountComponent,
        children: [
            { path: 'basicinfo', component: acBasic_component_1.AcBasicComponent },
            { path: 'address', component: acAddress_component_1.AcAddressComponent },
            { path: '', redirectTo: 'basicinfo', pathMatch: 'full' },
        ]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: pagenotfound_component_1.PageNotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, router_1.RouterModule.forRoot(appRoutes),
            forms_1.FormsModule, forms_1.ReactiveFormsModule, animations_1.BrowserAnimationsModule],
        declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, cart_component_1.CartComponent,
            productdetails_component_1.ProductDetailsComponent, pagenotfound_component_1.PageNotFoundComponent,
            footer_component_1.FooterComponent, header_component_1.HeaderComponent,
            login_component_1.LoginComponent, register_component_1.RegisterComponent, account_component_1.AccountComponent, acAddress_component_1.AcAddressComponent, acBasic_component_1.AcBasicComponent,
            navbar_component_1.NavbarComponent, loading_component_1.LoadingComponent, address_component_1.CartAddressComponent, payment_component_1.CartPaymentComponent, checkout_component_1.CheckoutComponent,
            complete_component_1.CartCompleteComponent, review_component_1.CartReviewComponent, pincode_component_1.PincodeComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [image_service_1.ImageService, home_service_1.HomeService, product_service_1.ProductService,
            authentication_service_1.AuthenticationService, storage_service_1.StorageService, miscellaneous_service_1.MiscellaneousService,
            account_service_1.AccountService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map