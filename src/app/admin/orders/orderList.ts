import { Component, OnInit } from '@angular/core';

import { CheckoutService} from '../../front/cart/checkoutService';
import { CheckoutOrderModel } from '../../shared/checkoutOrderModel';

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
                        <td>num</td>
                        <td>Name</td>
                        <td>Phone</td>
                        <td>Address</td>
                        <td>Additional</td>
                        <td>Date</td>
                        <td>Orders</td>
                    </tr>
                    <tr *ngFor="let order of checkoutOrder">
                        <td>num</td>
                        <td>{{order.name}}</td>
                        <td>{{order.phone}}</td>
                        <td>{{order.address}}</td>
                        <td>{{order.additional}}</td>
                        <td>{{order.date}}</td>
                        <td>
                            <table>
                                <tr>
                                    <td>Num</td>
                                    <td>Title</td>
                                    <td>Amount</td>
                                    <td>Cost</td>
                                </tr>
                                <tr>
                                    <td>num</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colspan="2">Total:</td>
                                    <td colspan="2"></td>
                                </tr>
                            </table>                            
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    `
})

export class OrderList implements OnInit {

    private checkoutOrder:CheckoutOrderModel[] = [];

    constructor (
        private checkoutService: CheckoutService
    ) {};

    ngOnInit(): void {
        this.checkoutService.getOrders()
            .then((response) => {
                this.checkoutOrder = response;
                console.log(response);
            });
    }
}