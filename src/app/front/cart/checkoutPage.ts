import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../admin/product/productService';
import { Product } from '../../admin/product/productModel';

import { OrderModel } from '../../shared/orderModel';
import { CartModel } from './cartModel';
import { CookieService } from '../../shared/cookieService';

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
                                        <input type="text" id="name" name="name" value="" />
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="phone">Phone:</label>
                                    <div class="cell">
                                        <input type="text" id="phone" name="phone" value="" />
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="address">Address:</label>
                                    <div class="cell">
                                        <textarea id="address" name="address"></textarea>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="additional">Additional:</label>
                                    <div class="cell">
                                        <textarea id="additional" name="additional"></textarea>
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

    constructor(
        private productService: ProductService,
        private cookieService: CookieService
    ) {}

    ngOnInit(): void {
        let orders = JSON.parse(this.cookieService.getCookie('cart'));
        let totalPrice = 0;

        for ( let i = 0 ; i < orders.length ; i++ ) {
            let obj = orders[i];
            this.productService.getProduct(obj.productId).then(product => {
                console.log(product);
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
        console.log(1);





        /*this.productService.update(this.product)
            .then(() => {
                for ( let i = 0; i < this.categoryList.length ; i++ ) {
                    for ( let j = 0 ; j < this.localRelations.length ; j++ ) {
                        //create elements
                        if ( this.categoryList[i].value !== this.localRelations[j].categoryId ) {
                            for ( let z = 0 ; z < this.selectedCategories.length ; z++ ) {
                                if ( this.selectedCategories[z].value ===  this.categoryList[i].value ) {
                                    this.relation = {
                                        id: Math.random() * (1000 - 10) + 10,
                                        productId: this.product.id,
                                        categoryId: this.selectedCategories[z].value
                                    };
                                    this.relationService.createRelationsOfProduct(this.relation).then(res => {});
                                }
                            }
                        } else {
                            //delete elements
                            for ( let z = 0 ; z < this.selectedCategories.length ; z++ ) {
                                if ( this.selectedCategories[z].value !==  this.localRelations[j].categoryId ) {
                                    this.relationService.deleteRelationsOfProduct(this.localRelations[j].id).then(res => {});
                                }
                            }
                        }
                    }
                }
            });*/
    }
}