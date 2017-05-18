import { Component, OnInit } from '@angular/core';

import { CheckoutService} from '../../services/checkoutService';
import { OrderHistory } from '../../models/OrderHistory';
import { CheckoutOrderModel } from '../../models/checkoutOrderModel';
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
                    <tr *ngFor="let order of orderList ; let index = index">
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
                                    <td class="productId">{{itemProduct.id}}</td>
                                    <td class="productName">{{itemProduct.name}}</td>
                                    <td class="productPrice">{{itemProduct.price}} {{itemProduct.currency}}</td>
                                    <td class="productAmount">{{itemProduct.amount}}</td>
                                    <td class="productTotalPrice">{{itemProduct.subTotalPrice}}</td>
                                </tr>
                                <tr>
                                    <td colspan="3">Total:</td>
                                    <td colspan="3">{{order.totalPrice}}</td>
                                </tr>
                            </table>
                        </td>
                        <td>{{order.status}}</td>
                        <td>
                            <a href="#" (click)="approveOrder(order, $event)">Approve</a>
                            <a href="#" (click)="declineOrder(order, $event)">Decline</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    `
})

export class OrderList implements OnInit {

    private orderList:OrderHistory[] = [];
    private checkoutOrderModel: CheckoutOrderModel[] = [];

    constructor (
        private productService: ProductService,
        private checkoutService: CheckoutService
    ) {};

    ngOnInit(): void {
        this.checkoutService.getOrders().then((response) => {
            console.log(response);
            for ( let i = 0 ; i < response.length ; i++ ) {
                this.orderList[i] = new OrderHistory();
                this.orderList[i].id = response[i].id;
                this.orderList[i].name = response[i].name;
                this.orderList[i].phone = response[i].phone;
                this.orderList[i].address = response[i].address;
                this.orderList[i].additional = response[i].additional;
                this.orderList[i].date = response[i].date;
                this.orderList[i].status = response[i].status;
                this.orderList[i].totalPrice = 0;
                this.orderList[i].products = [];
                for (let j = 0; j < response[i].products.length; j++) {
                    let currentItem = response[i].products[j];
                    this.productService.getProduct(currentItem.productId).then(product => {
                        console.log(product);
                        let subTotalPrice = 0;
                        if (product.price.length > 0) {
                            subTotalPrice = Number(product.price) * currentItem.amount;
                        }
                        this.orderList[i].products[j] = product;
                        this.orderList[i].products[j].subTotalPrice = subTotalPrice;
                        this.orderList[i].products[j].name = product.name;
                        this.orderList[i].products[j].price = product.price;
                        this.orderList[i].products[j].currency = product.currency;
                        this.orderList[i].products[j].amount = response[i].products[j].amount;
                        this.orderList[i].totalPrice = this.orderList[i].totalPrice + subTotalPrice;
                    });

                }
            }
            console.log(this.orderList);
        });
    }
    approveOrder(order, e) : void {
        e.preventDefault();
        order.status = 'approved';
        this.checkoutService.editOrders(order).then((response) => {});
    }
    declineOrder(order, e) : void {
        e.preventDefault();
        order.status = 'declined';
        this.checkoutService.editOrders(order).then((response) => {
        });
    }
}