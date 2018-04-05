import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { StorageService } from './services/storage.service';
import { Product } from './classes/product';
import { ActivatedRoute, Router } from '@angular/router';

declare var jquery: any;
declare var $: any;


@Component({
    selector: 'page-header',
    templateUrl: 'app/header.component.html',
    styleUrls: ['app/css/header.css']
})

export class HeaderComponent implements OnInit {
    access_token: any;
    userName: string;
    cartCount: number;
    cart: Product[] = [];
    cartSum: number;
    wish: Product[] = [];
    wishSum: number;
    ngOnInit(): void {
        
    }
    logout() {
        localStorage.removeItem('access_token');
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
        private _router: Router) {
        if (localStorage.getItem('access_token') != null) {
            this.access_token = JSON.parse(localStorage.getItem('access_token'));
            this.userName = this.access_token.userName;
        }

    }

}