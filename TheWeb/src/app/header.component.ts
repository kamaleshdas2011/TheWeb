import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { StorageService } from './services/storage.service';
import { Product } from './classes/product';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './classes/user';

declare var jquery: any;
declare var $: any;


@Component({
    selector: 'page-header',
    templateUrl: 'app/header.component.html',
    styleUrls: ['app/css/header.css']
})

export class HeaderComponent implements OnInit {
    access_token: any;
    user: User;
    cartCount: number;
    cart: Product[] = [];
    cartSum: number;
    wish: Product[] = [];
    wishSum: number;

    ngOnInit(): void {

        this.user = new User();
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.user = this._storeService.pullFromLocalStorage('user_info');
            //console.log(this.access_token);
        }
    }

    logout() {
        sessionStorage.removeItem('access_token');
        this.access_token = null;
        location.reload();
    }
    account() {
        $('.modal').modal('hide')
        this._router.navigate(['/account/basicinfo']);
        //console.log(this.access_token.userName);
    }
    
    cartPopup() {
        this.cart = this._storageService.pullCart();
        this.cartSum = this._storageService.getCartSum();
        
        setTimeout(function () {
            $('#cartPop').modal('show');
        }, 230);
    }
    wishPopup() {
        this.wish = this._storageService.pullWish();
        this.wishSum = this._storageService.getWishSum();

        setTimeout(function () {
            $('#wishPop').modal('show');
        }, 230);
    }
    gocart() {
        $('.modal').modal('hide')
        this._router.navigate(['/cart']);
    }
    removeFromCart(prod: Product) {
        this._storageService.storeCart(prod, 0);
        this.cart = this._storageService.pullCart();
        this.cartSum = this._storageService.getCartSum();
    }
    removeFromWish(prod: Product) {
        this._storageService.storeWish(prod);
        this.wish = this._storageService.pullWish();
        this.wishSum = this._storageService.getWishSum();
    }
    constructor(private _storageService: StorageService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _storeService: StorageService,) {

    }

}