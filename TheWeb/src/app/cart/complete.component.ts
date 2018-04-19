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
    templateUrl: 'app/cart/complete.component.html',
    styleUrls: ['app/cart/cart.component.css', 'app/cart/form.css',
        'app/cart/style.css'],

})
export class CartCompleteComponent implements OnInit {


    ngOnInit(): void {

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