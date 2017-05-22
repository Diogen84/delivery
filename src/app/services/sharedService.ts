import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { CookieService } from './cookieService';

@Injectable()
export class SharedService {
    constructor(
        private cookieService: CookieService
    ) {}
    // Observable string sources
    private cartAmount = new Subject<number>();

    // Observable string streams
    cartAmount$ = this.cartAmount.asObservable();

    publishCart(/*data : number*/) {
        let orders = JSON.parse(this.cookieService.getCookie('cart'));
        let cartAmount = 0;
        for ( let i = 0 ; i < orders.length ; i++ ) {
            cartAmount = cartAmount + orders[i].amount;
        }
        this.cartAmount.next(cartAmount);
    }
}