import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../admin/product/productService';
import { Product } from '../../admin/product/productModel';

import { OrderModel } from '../../shared/orderModel';
import { CartModel } from './cartModel';
import { CookieService } from '../../shared/cookieService';

@Component({
    moduleId: module.id,
    selector: 'div.cart-block',
    template:`<div class="cart">
        <div class="cart-picture">
            <img src="images/gallery1.png" alt="" />
        </div>
        <div class="cart-holder">
            <div class="cart-related">
                <table class="cart-table">
                    <tr class="title-row">
                        <td></td>
                        <td colspan="5" class="cart-table-description"><h3>{{item.product.name}}</h3></td>
                    </tr>
                    <tr *ngFor="let item of cart">
                        <td class="cart-table-img">
                            <img src="images/product-reference1.png" alt="" />
                        </td>
                        <td class="cart-table-description">
                            <ul>
                                <li>ID: {{item.product.id}}</li>
                                <li>Weight: {{item.product.weight}}</li>
                                <li>Category: ????</li>
                            </ul>
                        </td>
                        <td class="cart-table-description">
                            <p>{{item.product.description}}</p>
                        </td>
                        <td class="cart-table-quantity">
                            <input class="quantity" type="number" [(ngModel)]="item.amount" />
                        </td>
                        <td class="cart-table-price">
                            <span>{{item.product.price}}</span>
                        </td>
                        <td class="cart-table-options">
                            <ul>
                                <li><a href="#">Refresh</a></li>
                                <li><a href="#">Delete</a></li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>`
})

export class CartPage implements OnInit {
    product: Product = new Product();
    orders: OrderModel[] = [];
    cart: CartModel[] = [];

    constructor(
        private productService: ProductService,
        private cookieService: CookieService
    ) {}

    ngOnInit(): void {
        this.orders = JSON.parse(this.cookieService.getCookie('cart'));

        for ( let i = 0 ; i < this.orders.length ; i++ ) {
            let obj = this.orders[i];
            //console.log(obj);
            this.productService.getProduct(obj.productId).then(product => {
                this.cart.push({
                    product : product,
                    amount: obj.amount
                });
                console.log(this.cart);
            });
        }
    }
}