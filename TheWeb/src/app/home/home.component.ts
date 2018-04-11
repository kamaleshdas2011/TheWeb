import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Image } from '../classes/image';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'featured-product',
    templateUrl: 'app/home/home.component.html'
})
export class HomeComponent implements OnInit {
    gotoProductDetails(id: string) {
        this._router.navigate(['/productdetails', id]);
    }
    access_token: any;
    images: Image[] = [];

    ngOnInit(): void {
        this._imgService.getProductImages('1', 'Featured').subscribe(
            (imgData: any) => {
                this.images = imgData;
                //console.log(this.images)
            },
            (error1: any) => {
                console.log("Error happened" + error1)
            }
        );

        //this._prodSrv.getProducts(10,0).subscribe(
        //    (imgData: any) => {
        //        this.images = imgData;
        //        //console.log(this.images)
        //    },
        //    (error1: any) => {
        //        console.log("Error happened" + error1)
        //    }
        //);
    }
    constructor(private _imgService: ImageService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _prodSrv: ProductService) {
        if (localStorage.getItem('access_token') != null) {
            this.access_token = JSON.parse(localStorage.getItem('access_token'));
        }
    }
}