import { Component, OnInit } from '@angular/core';

import { ProductModel } from '../../models/productModel';
import { OrderModel } from '../../models/orderModel';
import { CartModel } from '../../models/cartModel';

import { ProductService } from '../../services/productService';
import { CookieService } from '../../services/cookieService';
import { SharedService } from '../../services/sharedService';

@Component({
    moduleId: module.id,
    selector: 'div.cart-block',
    template:`<div class="cart">
        <div class="cart-picture">
            <img src="images/gallery1.png" alt="" />
        </div>
        <div class="cart-holder">
            <div class="cart-related">
                <h2>Cart</h2>
                <table class="cart-table">
                    <tr class="title-row">
                        <td></td>
                        <td colspan="5" class="cart-table-description"><h3></h3></td>
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
                            <p>{{item.product.shortDescription}}</p>
                        </td>
                        <td class="cart-table-quantity">
                            <input class="quantity" type="number" [(ngModel)]="item.amount" />
                        </td>
                        <td class="cart-table-price">
                            <span>{{item.totalPrice}}</span>
                        </td>
                        <td class="cart-table-options">
                            <ul>
                                <li><a href="#" (click)="ngRefreshRow($event, item)">Refresh</a></li>
                                <li><a href="#" (click)="ngRemoveProduct($event, item)">Delete</a></li>
                            </ul>
                        </td>
                    </tr>
                </table>
                <div class="button-holder">
                    <a href="#/checkout">Checkout</a>
                </div>
            </div>
        </div>
    </div>`
})

export class CartPage implements OnInit {
    product: ProductModel = new ProductModel();
    cart: CartModel[] = [];
    orderModel : OrderModel = new OrderModel();
    cookieOrders: OrderModel[] = [];

    constructor(
        private productService: ProductService,
        private cookieService: CookieService,
        private sharedService: SharedService
    ) {}

    ngOnInit(): void {
        let orders = JSON.parse(this.cookieService.getCookie('cart'));
        let totalPrice = 0;

        this.sharedService.publishCart();
        for ( let i = 0 ; i < orders.length ; i++ ) {
            let obj = orders[i];
            this.productService.getProduct(obj.productId).then(product => {
                if (product.price.length > 0) {
                    totalPrice = Number(product.price) * obj.amount;
                }
                this.cart.push({
                    product : product,
                    amount: obj.amount,
                    totalPrice: totalPrice
                });
            });
        }
    }

    ngRemoveProduct(e, currentProduct) : void {
        e.preventDefault();

        let id = currentProduct.product.id;

        this.orderModel = {
            productId : currentProduct.product.id,
            amount : currentProduct.amount
        };

        this.cookieOrders = JSON.parse(this.cookieService.getCookie('cart'));

        let cookieIndex = this.cookieOrders.indexOf(this.cookieOrders.find(findExistingProductInCookieByID));

        this.cookieOrders.splice(cookieIndex, 1);
        this.cart.splice(this.cart.indexOf(currentProduct), 1);
        this.cookieService.setCookie('cart', JSON.stringify(this.cookieOrders), {
            expires :3600
        });

        this.sharedService.publishCart();

        function findExistingProductInCookieByID(item) {
            return item.productId === id;
        }
    }
    ngRefreshRow(e, currentProduct) : void {
        e.preventDefault();

        let id = currentProduct.product.id;

        this.orderModel = {
            productId : currentProduct.product.id,
            amount : currentProduct.amount
        };

        this.cookieOrders = JSON.parse(this.cookieService.getCookie('cart'));
        let result = this.cookieService.checkCookies(this.cookieOrders, this.orderModel);
        this.cookieService.setCookie('cart', JSON.stringify(result), {
            expires :3600
        });

        this.sharedService.publishCart();

        currentProduct.totalPrice = currentProduct.amount * currentProduct.product.price;
    }
}