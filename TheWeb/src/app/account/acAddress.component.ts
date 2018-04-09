import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Image } from '../classes/image';
import { ImageService } from '../services/image.service';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MiscellaneousService } from '../services/miscellaneous.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { AccountService } from '../services/account.service';
import { User } from '../classes/user';


declare var jquery: any;
declare var $: any;

@Component({
    templateUrl: 'app/account/acAddress.component.html',
    styleUrls: ['app/account/account.component.css',]
})
export class AcAddressComponent implements OnInit {
    userinfo: any;
    access_token: any;
    useraddress: any;

    ngOnInit(): void {
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.userinfo = this._storeService.pullFromSessionStorage('user_info');
        }
        this.getAllAddress();
    }
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
    constructor(private _imgService: ImageService,
        private _elm: ElementRef,
        private _rend: Renderer2,
        private _prodService: ProductService,
        private _activateroute: ActivatedRoute,
        private _storeService: StorageService,
        private _misService: MiscellaneousService,
        private _fb: FormBuilder,
        private _authService: AuthenticationService,
        private _acService: AccountService) { }
}