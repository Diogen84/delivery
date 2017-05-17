import { Component, OnInit } from '@angular/core';

import { CheckoutService} from '../../services/checkoutService';
import { CheckoutOrderListModel } from '../../models/checkoutOrderListModel';
import { ProductService } from '../../services/productService';

@Component({
    moduleId: module.id,
    selector: 'div.orders-block',
    template:`
        <div class="orders">
            <div class="orders-picture">
                <img src="images/gallery1.png" alt="" />
            </div>
            <div class="orders-holder">
                <table class="orders-table">
                    <tr>
                        <th class="num">num</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Additional</th>
                        <th>Date</th>
                        <th class="order-cell">Orders</th>
                        <th>Status</th>
                        <th>Operations</th>
                    </tr>
                    <tr *ngFor="let order of checkoutOrder ; let index = index">
                        <td class="num">{{index + 1}}</td>
                        <td>{{order.name}}</td>
                        <td>{{order.phone}}</td>
                        <td>{{order.address}}</td>
                        <td>{{order.additional}}</td>
                        <td>{{order.date}}</td>
                        <td class="order-cell">
                            <table>
                                <tr>
                                    <td>Num</td>
                                    <td>ID</td>
                                    <td>Title</td>
                                    <td>Price</td>
                                    <td>Amount</td>
                                    <td>Cost</td>
                                </tr>
                                <tr *ngFor="let itemProduct of order.products ; let i = index">
                                    <td class="productNum">{{i + 1}}</td>
                                    <td class="productId">{{itemProduct.productId}}</td>
                                    <td class="productName">{{itemProduct.name}}</td>
                                    <td class="productPrice">{{itemProduct.price}} {{itemProduct.currency}}</td>
                                    <td class="productAmount">{{itemProduct.amount}}</td>
                                    <td class="productTotalPrice">{{itemProduct.totalPrice}}</td>
                                </tr>
                                <tr>
                                    <td colspan="3">Total:</td>
                                    <td colspan="3">{{order.totalPrice}}</td>
                                </tr>
                            </table>                            
                        </td>
                        <td>Sent</td>
                        <td><a href="#">Approve</a><a href="#">Decline</a></td>
                    </tr>
                </table>
            </div>
        </div>
    `
})

export class OrderList implements OnInit {

    private checkoutOrder:CheckoutOrderListModel[] = [];

    constructor (
        private productService: ProductService,
        private checkoutService: CheckoutService
    ) {};

    ngOnInit(): void {
        this.checkoutService.getOrders().then((response) => {
            /*this.checkoutOrder = {
                name: response.name,
                phone: response.phone,
                address: response.address,
                additional: response.additional,
                date: response.date,
                products: response.products,
            };*/
            for ( let i = 0 ; i < response.length ; i++ ) {

                this.checkoutOrder[i].totalPrice = 0;
                for (let j = 0; j < response[i].products.length; j++) {

                    let currentItem = response[i].products[j];
                    this.productService.getProduct(currentItem.productId).then(product => {
                        let subTotalPrice = 0;
                        if (product.price.length > 0) {
                            subTotalPrice = Number(product.price) * currentItem.productId;
                        }
                        this.checkoutOrder[i].totalPrice = this.checkoutOrder[i].totalPrice + subTotalPrice;
                        currentItem.product = product;
                        currentItem.totalPrice = subTotalPrice;
                        currentItem.name = product.name;
                        currentItem.price = product.price;
                        currentItem.currency = product.currency;
                    });
                }
            }
        });
    }
}