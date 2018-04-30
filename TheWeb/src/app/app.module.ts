import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './home/productdetails.component';
import { PageNotFoundComponent } from './others/pagenotfound.component';
import { ImageService } from './services/image.service';
import { HomeService } from './services/home.service';
import { ProductService } from './services/product.service';
import { FooterComponent } from './footer.component';
import { HeaderComponent } from './header.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './login/register.component';
import { AuthenticationService } from './services/authentication.service';
import { StorageService } from './services/storage.service';
import { CartComponent } from './cart/cart.component';
import { MiscellaneousService } from './services/miscellaneous.service';
import { AccountComponent } from './account/account.component';
import { AccountService } from './services/account.service';
import { User } from './classes/user';
import { AcAddressComponent } from './account/acAddress.component';
import { AcBasicComponent } from './account/acBasic.component';
import { NavbarComponent } from './cart/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { CartAddressComponent } from './cart/address.component';
import { CartPaymentComponent } from './cart/payment.component';
import { CheckoutComponent } from './cart/checkout.component';
import { CartReviewComponent } from './cart/review.component';
import { CartCompleteComponent } from './cart/complete.component';
import { PincodeComponent } from './others/pincode.component';
import { OrderService } from './services/order.service';
import { CouponComponent } from './others/applycoupon.component';
//import { NgxImageGalleryModule } from 'ngx-image-gallery'
//import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'productdetails/:id', component: ProductDetailsComponent },
    { path: 'cart', component: CartComponent },
    {
        path: 'cart/checkout', component: CheckoutComponent,
        children: [
            { path: 'address', component: CartAddressComponent },
            { path: 'payment', component: CartPaymentComponent },
            { path: 'review', component: CartReviewComponent },
            { path: 'complete', component: CartCompleteComponent },

            { path: '', redirectTo: 'cart/checkout/address', pathMatch: 'full' },
        ]
    },
    
    {
        path: 'account', component: AccountComponent,
        children: [
            { path: 'basicinfo', component: AcBasicComponent },
            { path: 'address', component: AcAddressComponent },
            { path: '', redirectTo: 'basicinfo', pathMatch: 'full' },
        ]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [BrowserModule, HttpModule, RouterModule.forRoot(appRoutes),
        FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
    declarations: [AppComponent, HomeComponent, CartComponent,
        ProductDetailsComponent, PageNotFoundComponent,
        FooterComponent, HeaderComponent,
        LoginComponent, RegisterComponent, AccountComponent, AcAddressComponent, AcBasicComponent,
        NavbarComponent, LoadingComponent, CartAddressComponent, CartPaymentComponent, CheckoutComponent,
        CartCompleteComponent, CartReviewComponent, PincodeComponent, CouponComponent
    ],
    bootstrap: [AppComponent],
    providers: [ImageService, HomeService, ProductService,
        AuthenticationService, StorageService, MiscellaneousService,
        AccountService, OrderService],
    //entryComponents: [LoginComponent]
})
export class AppModule { }
