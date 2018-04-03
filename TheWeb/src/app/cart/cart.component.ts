import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Image } from '../classes/image';
import { ImageService } from '../services/image.service';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MiscellaneousService } from '../services/miscellaneous.service';


declare var jquery: any;
declare var $: any;



@Component({
    selector: 'cart-page',
    templateUrl: 'app/cart/cart.component.html',
    styleUrls: ['app/cart/cart.component.css',],

})
export class CartComponent implements OnInit {

    cart: Product[] = [];
    cartSum: number;
    pincode: string;
    address: object;

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
        //console.log(finalCount);
        this._storeService.storeCart(prod, finalCount);
        this.cart = this._storeService.pullCart();
        this.cartSum = this._storeService.getCartSum();
    }

    checkPin() {
        console.log(this.pincode);
        this._misService.getAddress(this.pincode)
            .subscribe(
            (response) => {
                this.address = response.results[0].formatted_address;
                //console.log(this.address);
                },
                (error) => {
                    console.log("Error happened" + error)
                }
            );;
        
    }
    ngOnInit(): void {
        this.cart = this._storeService.pullCart();
        this.cartSum = this._storeService.getCartSum();
    }
    constructor(private _imgService: ImageService,
        private _elm: ElementRef,
        private _rend: Renderer2,
        private _prodService: ProductService,
        private _activateroute: ActivatedRoute,
        private _storeService: StorageService,
        private _misService: MiscellaneousService,
    ) {
        

    }
}