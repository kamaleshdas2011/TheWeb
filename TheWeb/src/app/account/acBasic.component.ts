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
    templateUrl: 'app/account/acBasic.component.html',
    styleUrls: ['app/account/account.component.css',]

})
export class AcBasicComponent implements OnInit {
    access_token: any;
    acForm: FormGroup;
    statusMessage: string;
    private user: User;

    ngOnInit(): void {

        this.user = new User();
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.user = this._storeService.pullFromSessionStorage('user_info');
        }

        this.acForm = this._fb.group({
            Email: [this.user.Email, [Validators.required]],
            FirstName: [this.user.FirstName],
            LastName: [this.user.LastName],
            MiddleName: [this.user.MiddleName],
            PhoneNumber: [this.user.PhoneNumber]
        });
    }
    enableText(name: string) {
        const cont = this._elm.nativeElement.querySelector("#" + name);
        this._rend.removeAttribute(cont, 'readonly');
        const element = this._rend.selectRootElement("#" + name);
        setTimeout(() => element.focus(), 0);
    }
    updatebasicinfo() {

        var formValue = this.acForm.value;

        this._acService.updateUserData(formValue)
            .subscribe(
                (data: any) => {
                    this.statusMessage = "Update successful.";
                },
                (error: any) => {
                    console.log("Error happened. " + error);
                    this.statusMessage = "Something went wrong. Try agin after sometime";
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