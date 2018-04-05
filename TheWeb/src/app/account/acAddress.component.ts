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
    ngOnInit(): void {
        
    }
}