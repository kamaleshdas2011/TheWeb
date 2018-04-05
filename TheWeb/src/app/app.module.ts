import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';


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
//import { NgxImageGalleryModule } from 'ngx-image-gallery'
//import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'productdetails/:id', component: ProductDetailsComponent },
    { path: 'cart', component: CartComponent },
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
        FormsModule, ReactiveFormsModule],
    declarations: [AppComponent, HomeComponent, CartComponent,
        ProductDetailsComponent, PageNotFoundComponent,
        FooterComponent, HeaderComponent,
        LoginComponent, RegisterComponent, AccountComponent, AcAddressComponent, AcBasicComponent
    ],
    bootstrap: [AppComponent],
    providers: [ImageService, HomeService, ProductService,
        AuthenticationService, StorageService, MiscellaneousService,
        AccountService],
    //entryComponents: [LoginComponent]
})
export class AppModule { }
