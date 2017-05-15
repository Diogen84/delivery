import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../admin/product/productService';
import { Product } from '../../admin/product/productModel';

import { OrderModel } from '../../shared/orderModel';
import { CartModel } from './cartModel';
import { CheckoutOrderModel } from '../../shared/checkoutOrderModel';
import { CookieService } from '../../shared/cookieService';
import { CheckoutService } from './checkoutService';

@Component({
    moduleId: module.id,
    selector: 'div.checkout-block',
    template:`
        <div class="checkout">
            <div class="checkout-picture">
                <img src="images/gallery1.png" alt="" />
            </div>
            <div class="checkout-holder">
                
                <table class="checkout-table">
                    <tr class="title-row">
                        <td></td>
                        <td colspan="5" class="checkout-table-description"><h3></h3></td>
                    </tr>
                    <tr *ngFor="let item of cart">
                        <td class="checkout-table-img">
                            <img src="images/product-reference1.png" alt="" />
                        </td>
                        <td class="checkout-table-description">
                            <ul>
                                <li>ID: {{item.product.id}}</li>
                                <li>Weight: {{item.product.weight}}</li>
                                <li>Category: ????</li>
                            </ul>
                        </td>
                        <td class="checkout-table-description">
                            <p>{{item.product.shortDescription}}</p>
                        </td>
                        <td class="checkout-table-quantity">
                            {{item.amount}}
                        </td>
                        <td class="checkout-table-price">
                            <span>{{item.totalPrice}}</span>
                        </td>
                    </tr>
                </table>
                
                <div class="checkout-form">
                    <h3>Checkout</h3>
                    <p>Please fill the form to proceed:</p>
                    <form #checkoutForm="ngForm" (ngSubmit)="onSubmitCheckoutForm(checkoutForm.value)">
                        <fieldset>
                            <div class="checkout-table-form">
                                <div class="row">
                                    <label for="name">Name:</label>
                                    <div class="cell">
                                        <input type="text" id="name" name="customerName" [(ngModel)]="checkoutOrder.name" />
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="phone">Phone:</label>
                                    <div class="cell">
                                        <input type="text" id="phone" name="customerPhone" [(ngModel)]="checkoutOrder.phone" />
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="address">Address:</label>
                                    <div class="cell">
                                        <textarea id="address" name="customerAddress" [(ngModel)]="checkoutOrder.address"></textarea>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="additional">Additional:</label>
                                    <div class="cell">
                                        <textarea id="additional" name="customerAdditional" [(ngModel)]="checkoutOrder.additional"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <input type="submit" class="btn" value="Approve order" />
                                <a href="#/cart" class="btn">Change order</a>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    `
})

export class CheckoutPage implements OnInit {
    product: Product = new Product();
    cart: CartModel[] = [];
    orderModel : OrderModel = new OrderModel();
    cookieOrders: OrderModel[] = [];
    checkoutOrder: CheckoutOrderModel = new CheckoutOrderModel();

    constructor(
        private productService: ProductService,
        private cookieService: CookieService,
        private checkoutService: CheckoutService
    ) {}

    ngOnInit(): void {
        let orders = JSON.parse(this.cookieService.getCookie('cart'));
        let totalPrice = 0;

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
    onSubmitCheckoutForm(): void {
        let date = new Date();
        this.checkoutOrder.products = [];
        this.checkoutOrder.date = date;
        this.checkoutOrder.name = this.checkoutOrder.name || '';
        this.checkoutOrder.phone = this.checkoutOrder.phone || '';
        this.checkoutOrder.address = this.checkoutOrder.address || '';
        this.checkoutOrder.additional = this.checkoutOrder.additional || '';

        for ( let i = 0; i < this.cart.length ; i++ ) {
            let item = this.cart[i];
            this.checkoutOrder.products.push({
                productId:item.product.id,
                amount: item.amount
            });
        }

        this.checkoutService.setOrder(this.checkoutOrder)
            .then((response) => {
                console.log(response);
            });
    }
}