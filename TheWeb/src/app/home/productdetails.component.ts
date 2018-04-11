import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Image } from '../classes/image';
import { ImageService } from '../services/image.service';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Location } from '@angular/common';

declare var jquery: any;
declare var $: any;


@Component({
    selector: 'product-details',
    templateUrl: 'app/home/productdetails.component.html',
    styleUrls: ['app/home/productdetails.component.css'],
})
export class ProductDetailsComponent implements OnInit {
    visible: string = 'prod-img-visible';
    product: Product;
    images: Image[];
    statusMessage: string;
    prodlist: any;
    ngOnInit(): void {

        this.loadComponent();


    }
    loadComponent() {
        let prodid: string = this._activateroute.snapshot.params['id'];
        this._prodService.getProductDetails(prodid)
            .subscribe(
                (response) => {
                    this.product = response;
                    //console.log(this.product);
                    this._imgService.getProductImages(this.product.ProductID, 'Details').subscribe(
                        (imgData: any) => {
                            this.images = imgData;
                        },
                        (error1: any) => {
                            console.log("Error happened" + error1)

                            if (error1.status === '401') {
                                this.statusMessage = 'Session expired, please login again.';
                            }
                        }
                    );
                },
                (error) => {
                    console.log("Error happened" + error)

                    if (error.status === '401') {
                        this.statusMessage = 'Session expired, please login again.';
                    }
                }
            );

    }
    displayImage(index: string) {

        //hide active image
        let activeImage = this._elm.nativeElement.querySelector(".prod-img-visible");
        
        this._rend.removeClass(activeImage, 'prod-img-visible');
        this._rend.addClass(activeImage, 'prod-img-hide');

        //show clicked image
        let input = this._elm.nativeElement.querySelector('#image-' + index);
        this._rend.removeClass(input, 'prod-img-hide');
        this._rend.addClass(input, 'prod-img-visible');
    }
    addToCart(product: Product) {
        let itemCount = this._elm.nativeElement.querySelector('#prodqty').value;
        this._storeService.storeCart(product, itemCount);
        $('#alertAddCart').show('fade');
    }
    clickWish(prod: Product) {
        if (this._storeService.presentInWishlist(prod.ProductID)) {
            $('#alertWishRemove').show('fade');
            $('#alertWishAdd').hide('fade');
        }
        else {
            $('#alertWishAdd').show('fade');
            $('#alertWishRemove').hide('fade');
        }
        this._storeService.storeWish(prod);
    }
    constructor(private _imgService: ImageService,
        private _elm: ElementRef,
        private _rend: Renderer2,
        private _prodService: ProductService,
        private _activateroute: ActivatedRoute,
        private _storeService: StorageService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {
        this._route.params.subscribe(params => {
            this.loadComponent();

        });
    }
}