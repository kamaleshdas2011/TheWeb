import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { Image } from '../classes/image';
import { ImageService } from '../services/image.service';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MiscellaneousService } from '../services/miscellaneous.service';
import { elementAt } from 'rxjs/operator/elementAt';


declare var jquery: any;
declare var $: any;



@Component({
    selector: 'check-pincode',
    templateUrl: 'app/others/pincode.component.html',
    //styleUrls: ['app/cart/cart.component.css'],
})
export class PincodeComponent implements OnInit {

    pincode: string;
    @Output() address = new EventEmitter;
    access_token: any;
    userinfo: any;
    @Output() delCharge = new EventEmitter;



    checkPin() {
        //console.log(this.pincode);
        this._misService.getAddress(this.pincode)
            .subscribe(
                (response) => {
                    this.address = response.results[0].formatted_address;
                    //this.address.emit();
                    this._storeService.storeInLocalStorage(this.pincode, 'pincode');
                    this.getDeliveryCharge();
                    //console.log(this.address);
                },
                (error) => {
                    console.log("Error happened" + error)
                }
            );
    }

    getDeliveryCharge() {
        //this.delCharge=
        this.delCharge.emit(this._prodService.getDeliveryCharge(this.pincode));
    }
    ngOnInit(): void {


        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.userinfo = this._storeService.pullFromSessionStorage('user_info');
        }
        if (this._storeService.pullFromLocalStorage('pincode')) {
            this.pincode = this._storeService.pullFromLocalStorage('pincode');
            this.checkPin();
        }
        else {
            this.address = null;
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