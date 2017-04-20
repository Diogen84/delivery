import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../../admin/product/productService';
import { Product } from '../../admin/product/productModel';

import { OrderModel } from '../../shared/orderModel';
import { CookieService } from '../../shared/cookieService';

@Component({
    moduleId: module.id,
    selector: 'div.products',
    template:`
        <div class="product-details">
            <div class="holder">
                <div class="top-section">
                    <div class="visual">
                        <ul class="img">
                            <li><img src="" alt="" /></li>
                        </ul>
                        <ul class="img-switch">
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                        </ul>
                    </div>
                    <div class="description">
                        <h1>{{product.name}}</h1>
                        <ul>
                            <li>ID: {{product.id}}</li>
                            <li>Weight: {{product.weight}}</li>
                            <li>Price: {{product.price}}</li>
                            <li>In stock: {{product.inStock}}</li>
                            <li>Quantity: 
                                <form #buyProductForm="ngForm" (ngSubmit)="onSubmitBuyProductForm(buyProductForm.value)">
                                    <fieldset>
                                        <input class="quantity" type="number" [(ngModel)]="amount" name="amount" #quantity="ngModel" />
                                        <input type="submit" class="submit" value="Buy" />
                                    </fieldset>
                                </form>
                            </li>
                        </ul>
                        <ul class="options">
                            <li><a href="#">Add to favorites</a></li>
                            <li><a href="#">Remove from favorites</a></li>
                        </ul>
                        <div class="description-text">
                            {{product.description}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="reference">
                <div class="holder">
                    <div class="reference-block">
                        <div class="picture">
                            <img src="images/product-reference1.png" alt="" />
                        </div>
                        <div class="description">
                            <p>Lorem ispum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                        </div>
                        <ul class="options">
                            <li><a href="#">Buy in one click</a></li>
                            <li><a href="#">Details</a></li>
                            <li><a href="#">Add to favorites</a></li>
                            <li><a href="#">Remove from favorites</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class ProductPage implements OnInit {
    product: Product = new Product();
    amount : number;
    data : string;
    cart: OrderModel;
    cookieOrders: OrderModel[] = [];

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cookieService: CookieService
    ) {}

    ngOnInit(): void {
        this.route.params.switchMap((params: Params) => this.productService.getProduct(+params['id']))
            .subscribe(item => {
                this.product = item;
                this.amount = 1;
            });
    }

    onSubmitBuyProductForm(): void {
        this.cart = {
            productId: this.product.id,
            amount: this.amount
        };
        this.cookieOrders = JSON.parse(this.cookieService.getCookie('cart'));
        let result = this.cookieService.checkCookies(this.cookieOrders, this.cart);
        this.cookieService.setCookie('cart', JSON.stringify(result), {
            expires :3600
        });
        console.log(result);
        console.log('===================================');
    }
}