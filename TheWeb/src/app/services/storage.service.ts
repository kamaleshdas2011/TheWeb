﻿import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Product } from '../classes/product';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

@Injectable()
export class StorageService {


    //access_token//
    store_access_token(body: any): void {
        localStorage.setItem('access_token', JSON.stringify(body));
    }
    pull_access_token() {
        let access_token;
        if (localStorage.getItem('access_token') != null) {
            access_token = JSON.parse(localStorage.getItem('access_token'));
        }
        return access_token;
    }
    //cart//
    storeCart(product: Product, count: number) {
        let cart: Product[] = [];
        if (localStorage.getItem('cart_items')) {
            cart = JSON.parse(localStorage.getItem('cart_items'));
            if (cart.find(m => m.ProductID == product.ProductID)) {
                // update Qty if product is already present
                if (count==0) {
                    const index = cart.findIndex(order => order.ProductID == product.ProductID);
                    cart.splice(index, 1);
                }
                else {
                    for (var i in cart) {
                        if (cart[i].ProductID == product.ProductID) {
                            cart[i].CartCount = count  // replace existing Qty
                        }
                    }
                }
                
            }
            else {
                product.CartCount = count;
                cart.push(product);
            }
        }
        else {
            product.CartCount = count;
            cart.push(product);
        }
        //console.log(cart);
        localStorage.setItem('cart_items', JSON.stringify(cart));
    }
    pullCart() {
        let cart: Product[] = [];
        if (localStorage.getItem('cart_items')) {
            cart = JSON.parse(localStorage.getItem('cart_items'));
            //Object.assign(cart, JSON.parse(localStorage.getItem('cart_items')));
        }
        //console.log(cart);
        return cart;
        
    }
    getCartCount() {
        let count = 0;
        if (localStorage.getItem('cart_items')) {
            let cart: Product[] = JSON.parse(localStorage.getItem('cart_items'));
            count = cart.length;
            //console.log(JSON.parse(localStorage.getItem('cart_items')));
        }
        return count;
    }
    getCartSum() {
        let sum: number = 0;
        if (localStorage.getItem('cart_items')) {
            let cart: Product[] = JSON.parse(localStorage.getItem('cart_items'));
            for (let i = 0; i < cart.length; i++) {
                //console.log(cart[i].ProductPrice)
                sum = sum + (cart[i].ProductPrice * cart[i].CartCount);
            }
        }
        
        return sum;
    }

    //wishlist//
    storeWish(product: Product) {
        let wish: Product[] = [];
        if (localStorage.getItem('wish_items')) {
            wish = JSON.parse(localStorage.getItem('wish_items'));
            if (wish.find(m => m.ProductID == product.ProductID)) {
                const index = wish.findIndex(order => order.ProductID == product.ProductID);
                wish.splice(index, 1);
            }
            else {
                wish.push(product);
            }
        }
        else {
            wish.push(product);
        }
        //console.log(cart);
        localStorage.setItem('wish_items', JSON.stringify(wish));
    }
    pullWish() {
        let wish: Product[] = [];
        if (localStorage.getItem('wish_items')) {
            wish = JSON.parse(localStorage.getItem('wish_items'));
        }
        //console.log(cart);
        return wish;

    }
    getWishCount() {
        let count = 0;
        if (localStorage.getItem('wish_items')) {
            let wish: Product[] = JSON.parse(localStorage.getItem('wish_items'));
            count = wish.length;
            //console.log(JSON.parse(localStorage.getItem('cart_items')));
        }
        return count;
    }
    getWishSum() {
        let sum: number = 0;
        if (localStorage.getItem('wish_items')) {
            let cart: Product[] = JSON.parse(localStorage.getItem('wish_items'));
            for (let i = 0; i < cart.length; i++) {
                //console.log(cart[i].ProductPrice)
                sum = sum + cart[i].ProductPrice;
            }
        }

        return sum;
    }
    presentInWishlist(productid: string) {
        let wish: Product[] = [];
        if (localStorage.getItem('wish_items')) {
            wish = JSON.parse(localStorage.getItem('wish_items'));
            if (wish.find(m => m.ProductID == productid)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    constructor(private _http: Http) {

    }
}
