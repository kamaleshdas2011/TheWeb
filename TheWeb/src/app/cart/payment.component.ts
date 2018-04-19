import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Image } from '../classes/image';
import { ImageService } from '../services/image.service';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
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
    
    ngOnInit(): void {
        this.Order = this._orderService.Order;
        console.log(this.Order);
    }
    constructor(private _imgService: ImageService,
        private _elm: ElementRef,
        private _rend: Renderer2,
        private _prodService: ProductService,
        private _activateroute: ActivatedRoute,
        private _storeService: StorageService,
        private _misService: MiscellaneousService,
        private _orderService: OrderService,
    ) {


    }
}