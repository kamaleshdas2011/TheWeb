import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Image } from '../classes/image';
import { ImageService } from '../services/image.service';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MiscellaneousService } from '../services/miscellaneous.service';
import { OrderService } from '../services/order.service';
import { Order } from '../classes/Order';


declare var jquery: any;
declare var $: any;



@Component({
    templateUrl: 'app/cart/payment.component.html',
    styleUrls: ['app/cart/cart.component.css', 'app/cart/form.css',
       'app/cart/style.css'],

})
export class CartPaymentComponent implements OnInit {

    Order: Order;
    cart: Product[];
    cartSum: number;
    pincode: string;
    access_token: any;
    userinfo: any;
    delCharge: number = 0;

    ngOnInit(): void {
        //console.log(this.Order);
        this.cart = this._storeService.pullCart();
        this.cartSum = this._storeService.getCartSum();
        console.log(this.cart);
        console.log(this.cartSum);
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.userinfo = this._storeService.pullFromSessionStorage('user_info');
        }
        if (this._storeService.pullFromSessionStorage('order')) {
            this.Order = this._storeService.pullFromSessionStorage('order');
        }
        if (Object.keys(this.Order).length == 0) {
            this._router.navigate(['/cart/checkout/address']);
        }
    }
    constructor(private _imgService: ImageService,
        private _elm: ElementRef,
        private _rend: Renderer2,
        private _prodService: ProductService,
        private _activateroute: ActivatedRoute,
        private _storeService: StorageService,
        private _misService: MiscellaneousService,
        private _orderService: OrderService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {


    }
}