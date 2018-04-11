import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { StorageService } from './services/storage.service';
import { Product } from './classes/product';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './classes/user';
import { AuthenticationService } from './services/authentication.service';
import { Observable, Subject } from 'rxjs';
import { ProductService } from './services/product.service';

declare var jquery: any;
declare var $: any;


@Component({
    selector: 'page-header',
    templateUrl: 'app/header.component.html',
    styleUrls: ['app/css/header.css']
})

export class HeaderComponent implements OnInit {
    access_token: any;
    user: User;
    cartCount: number;
    cart: Product[] = [];
    cartSum: number;
    wish: Product[] = [];
    wishSum: number;

    public prodlist: Observable<any[]>;
    private searchTerms = new Subject<string>();
    public ProdName = '';
    public flag: boolean = true;

    ngOnInit(): void {

        this.user = new User();
        if (this._storeService.pull_access_token()) {
            this.access_token = this._storeService.pull_access_token().access_token;
            this.user = this._storeService.pullFromSessionStorage('user_info');
            //console.log(this.access_token);
        }

        this.prodlist = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events  
            .distinctUntilChanged()   // ignore if next search term is same as previous  
            .switchMap(term => term   // switch to new observable each time  
                // return the http search observable  
                ? this._prodService.search(term)
                // or the observable of empty heroes if no search term  
                : Observable.of<any[]>([]))
            .catch(error => {
                // TODO: real error handling  
                console.log(error);
                return Observable.of<any[]>([]);
            });
    }
    openSearch() {
        //document.getElementById('searchbox').focus();
        //document.getElementById('searchbox').value = '';;

        document.getElementById("myOverlay").style.display = "block";
        
        //$('.search').val('');
        //$('.search').focus();
        //document.getElementById('#searchbox').value = '';

        //this.flag = false;
    }
    closeSearch() {
        document.getElementById("myOverlay").style.display = "none";
    }
    // Push a search term into the observable stream.  
    searchProd(term: string): void {
        this.flag = true;
        this.searchTerms.next(term);
    }
    onselectProd(prod: any) {
        document.getElementById("myOverlay").style.display = "none";
        //this._router.navigate(['/productdetails', prod.ProductID]);
        
        this._router.navigate(['/productdetails', '1']);
    }
    logout() {
        //this._authService.logout().subscribe((data) => {

        //}, (error) => console.log(error));
        this._storageService.remove_access_token();
        this._storeService.removeFromSessionStorage('user_info');
        this.access_token = null;
        location.reload();
    }
    account() {
        $('.modal').modal('hide')
        this._router.navigate(['/account/basicinfo']);
        //console.log(this.access_token.userName);
    }

    cartPopup() {
        this.cart = this._storageService.pullCart();
        this.cartSum = this._storageService.getCartSum();

        setTimeout(function () {
            $('#cartPop').modal('show');
        }, 230);
    }
    wishPopup() {
        this.wish = this._storageService.pullWish();
        this.wishSum = this._storageService.getWishSum();

        setTimeout(function () {
            $('#wishPop').modal('show');
        }, 230);
    }
    gocart() {
        $('.modal').modal('hide')
        this._router.navigate(['/cart']);
    }
    removeFromCart(prod: Product) {
        this._storageService.storeCart(prod, 0);
        this.cart = this._storageService.pullCart();
        this.cartSum = this._storageService.getCartSum();
    }
    removeFromWish(prod: Product) {
        this._storageService.storeWish(prod);
        this.wish = this._storageService.pullWish();
        this.wishSum = this._storageService.getWishSum();
    }
    constructor(private _storageService: StorageService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _storeService: StorageService,
        private _authService: AuthenticationService,
        private _prodService: ProductService) {

    }

}