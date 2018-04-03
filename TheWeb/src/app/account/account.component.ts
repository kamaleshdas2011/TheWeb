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
    selector: 'user-profile',
    templateUrl: 'app/account/account.component.html',
    styleUrls: ['app/account/account.component.css',],

})
export class AccountComponent implements OnInit {
    access_token: any;
    userName: string;
    
    ngOnInit(): void {
        if (localStorage.getItem('access_token') != null) {
            this.access_token = JSON.parse(localStorage.getItem('access_token'));
            this.userName = this.access_token.userName;
        } 
    }
    constructor(private _imgService: ImageService,
        private _elm: ElementRef,
        private _rend: Renderer2,
        private _prodService: ProductService,
        private _activateroute: ActivatedRoute,
        private _storeService: StorageService,
        private _misService: MiscellaneousService,
    )
    {
        
    }
}