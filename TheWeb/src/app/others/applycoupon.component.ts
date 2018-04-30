import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
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
    selector: 'apply-coupon',
    templateUrl: 'app/others/applycoupon.component.html',
    //styleUrls: ['app/cart/cart.component.css'],
})
export class CouponComponent implements OnInit {

    access_token: any;
    userinfo: any;
    couponCode: string;
    @Output() coupons = new EventEmitter;

    checkCoupon() {
        this._misService.checkCoupon(this.couponCode)
            .subscribe(
                (response) => {
                    this.coupons = response;
                },
                (error) => {
                    console.log("Error happened" + error)
                }
            );
    }
    ngOnInit(): void {

        this.coupons = null;
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