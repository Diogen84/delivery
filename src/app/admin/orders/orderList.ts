import { Component, OnInit } from '@angular/core';

import { CheckoutService} from '../../shared/checkoutService';

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
                    
                </table>
            </div>
        </div>
    `
})

export class OrderList implements OnInit {
    constructor (
        private checkoutService: CheckoutService
    ){};
    ngOnInit(): void {
        console.log(2);
    }
}