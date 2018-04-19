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
    acForm: FormGroup;
    statusMessage: string;
    addnewaddress: boolean = false;
    addresstypes: any;
    states: any;
    addTypeSelection: any;
    stateSelection: any = 0;
    pincode: string;

    ngOnInit(): void {

        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.userinfo = this._storeService.pullFromSessionStorage('user_info');
            this.getAllAddress();
            this.getAddressTypes();
            this.getStates();
        }
        
        

        this.acForm = this._fb.group({
            Name: [''],
            PhoneNumber: [''],
            City: [''],
            AddressLine1: [''],
            AddressLine2: [''],
            StateProvinceID: [''],
            PostalCode: [''],
            AddressTypeID: [''],
            Landmark: [''],
            AlternatePhoneNumber: [''],
            //AddressID:[''],
        });
    }
    editAddress() {
        this._acService.getAddressTypes()
            .subscribe((data: any) => {
                this.addresstypes = data;
            },
                (error: any) => {
                    console.log("Error happened. " + error);
                });
    }
    clickDelete(AddressID: string) {
        $('#hiddenaddid').attr("value", AddressID);
        $('#deleteModal').modal();

    }
    deleteAddress() {
        let AddressID: string = $('#hiddenaddid').val();

        this._acService.deleteAddress(AddressID)
            .subscribe((data: any) => {
                $('#deleteModal').modal('hide');
                this.getAllAddress();
            },
            (error: any) => {
                    //this.statusMessage = "Something went wrong. Try agin after sometime";
                    console.log("Error happened. " + error);
                });
    }

    getAddressTypes() {
        this._acService.getAddressTypes()
            .subscribe((data: any) => {
                this.addresstypes = data;
            },
                (error: any) => {
                    console.log("Error happened. " + error);
                });
    }
    getStates() {
        this._acService.getStates()
            .subscribe((data: any) => {
                this.states = data;
            },
                (error: any) => {
                    console.log("Error happened. " + error);
                });
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
    addNewAddress() {
        //console.log(this.addTypeSelection);
        //console.log(this.stateSelection);
        var formValue = this.acForm.value;
        //console.log(formValue);
        this._acService.addNewAddress(formValue)
            .subscribe(
                (data: any) => {
                    this.statusMessage = "Successfully added";
                    this.addnewaddress = false;
                    this.getAllAddress();
                    this.acForm.reset();
                },
                (error: any) => {
                    console.log("Error happened. " + error);
                    this.statusMessage = "Something went wrong. Try agin after sometime";
                }
            );
    }
    pinonblur() {
        //console.log(this.pincode);
        var state: string;
        var city: string;
        this._misService.getAddress(this.pincode)
            .subscribe(
                (response) => {
                    var address = response.results[0].address_components;
                    $.each(address, function (i: any, v: any) {
                        $.each(v.types, function (f: any, g: any) {
                            //console.log(g);
                            if (g == 'administrative_area_level_1') {
                                //console.log(v.short_name);
                                state = v.short_name;
                            }
                            if (g == 'locality') {
                                city = v.short_name;
                            }
                        })

                    });
                    //this.stateSelection = state;
                    //this.acForm.setValue({ City: city });
                    this.acForm.get('City').setValue(city);
                    this.acForm.get('StateProvinceID').setValue(state);

                },
                (error) => {
                    console.log("Error happened" + error)
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