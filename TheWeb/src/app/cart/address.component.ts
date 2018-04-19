import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Image } from '../classes/image';
import { ImageService } from '../services/image.service';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MiscellaneousService } from '../services/miscellaneous.service';
import { AuthenticationService } from '../services/authentication.service';
import { AccountService } from '../services/account.service';


declare var jquery: any;
declare var $: any;



@Component({
    templateUrl: 'app/cart/address.component.html',
    styleUrls: ['app/cart/cart.component.css', 'app/cart/form.css',
        'app/cart/style.css'],

})
export class CartAddressComponent implements OnInit {
    access_token: any;
    userinfo: any;
    useraddress: any;

    getAllAddress() {
        this._acService.getAllAddress()
            .subscribe(
                (data: any) => {
                    this.useraddress = data;
                },
                (error: any) => {
                    console.log("Error happened. " + error);
                }
            );
    }
    ngOnInit(): void {
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.userinfo = this._storeService.pullFromSessionStorage('user_info');
            this.getAllAddress();
        }
        
    }
    constructor(private _imgService: ImageService,
        private _elm: ElementRef,
        private _rend: Renderer2,
        private _prodService: ProductService,
        private _activateroute: ActivatedRoute,
        private _storeService: StorageService,
        private _misService: MiscellaneousService,
        private _authService: AuthenticationService,
        private _acService: AccountService
    ) {


    }
}