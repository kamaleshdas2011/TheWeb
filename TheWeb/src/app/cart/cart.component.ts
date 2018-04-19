import { Component, OnInit, ViewChild, ElementRef, Renderer2,EventEmitter } from '@angular/core';
import { Image } from '../classes/image';
import { ImageService } from '../services/image.service';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MiscellaneousService } from '../services/miscellaneous.service';


declare var jquery: any;
declare var $: any;



@Component({
    selector: 'cart-page',
    templateUrl: 'app/cart/cart.component.html',
    styleUrls: ['app/cart/cart.component.css'],
})
export class CartComponent implements OnInit {

    cart: Product[];
    cartSum: number;
    pincode: string;
    address: any;
    access_token: any;
    userinfo: any;
    delCharge: number = 0;

    removeFromCart(prod: Product) {
        this._storeService.storeCart(prod, 0);
        this.cart = this._storeService.pullCart();
        this.cartSum = this._storeService.getCartSum();
    }
    changeNumber(prod: Product, count: number) {
        let finalCount: number = 0;
        let str: string = prod.CartCount.toString();
        if (count == -1) {
            finalCount = parseInt(str) - 1;
        }
        else if (count == 1) {
            finalCount = parseInt(str) + 1;
        }

        this._storeService.storeCart(prod, finalCount);
        this.cart = this._storeService.pullCart();
        this.cartSum = this._storeService.getCartSum();
    }

    checkPin(address: any) {
        this.address = address;
    }
    checkout() {
        if (this.userinfo) {
            this._router.navigate(['/cart/checkout/address']);
        }
        else {
            $('#loginModal').modal();
        }
    }
    private sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    getDeliveryCharge(delCharge: any) {
        this.delCharge = parseInt(delCharge);
    }
    ngOnInit(): void {
        this.sleep(100).then(() => {
            this.cart = this._storeService.pullCart();
            this.cartSum = this._storeService.getCartSum();
        })

        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.userinfo = this._storeService.pullFromSessionStorage('user_info');
        }

        
    }
    constructor(private _imgService: ImageService,
        private _elm: ElementRef,
        private _rend: Renderer2,
        private _prodService: ProductService,
        private _activateroute: ActivatedRoute,
        private _storeService: StorageService,
        private _misService: MiscellaneousService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {


    }
}