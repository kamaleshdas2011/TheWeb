import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Image } from '../classes/image';
import { ImageService } from '../services/image.service';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';


declare var jquery: any;
declare var $: any;


@Component({
    selector: 'product-details',
    templateUrl: 'app/home/productdetails.component.html',
    styleUrls: ['app/home/productdetails.component.css'],
})
export class ProductDetailsComponent implements OnInit {

    visible: string = 'visible';
    product: Product;
    images: Image[];
    statusMessage: string;

    ngOnInit(): void {
        
        let prodid: string = this._activateroute.snapshot.params['id'];
        this._prodService.getProductDetails(prodid)
            .subscribe(
                (response)=> {
                    this.product = response;
                    //console.log(this.product);
                    this._imgService.getProductImages(this.product.ProductID, 'Details').subscribe(
                        (imgData: any)=> {
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
                (error)=> {
                    console.log("Error happened" + error)

                    if (error.status === '401') {
                        this.statusMessage = 'Session expired, please login again.';
                    }
                }
            );

    }

    displayImage(index: string, event: any) {

        let input = this._elm.nativeElement.querySelector('#image-' + index);
        let allImages = this._elm.nativeElement.querySelector(".visible");
        this._rend.removeClass(allImages, 'visible');
        this._rend.addClass(input, 'visible');

    }
    addToCart(product: Product) {
        let itemCount = this._elm.nativeElement.querySelector('#prodqty').value;
        this._storeService.storeCart(product, itemCount);
        $('#alertAddCart').show('fade');
    }
    clickWish(prod: Product) {
        console.log(this._storeService.presentInWishlist(prod.ProductID));
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
    ) {

    }
}