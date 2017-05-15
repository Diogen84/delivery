import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { OrderModel } from '../../shared/orderModel';
import { CheckoutOrderModel } from '../../shared/checkoutOrderModel';

@Injectable()
export class CheckoutService {
    private order:OrderModel[] = [];
    private checkoutOrder:CheckoutOrderModel[];

    private headers = new Headers({'Content-Type': 'application/json'});
    private checkoutOrderUrl = 'api/orders';

    constructor(private http: Http) { }

    setOrder(checkoutOrder:CheckoutOrderModel[]):Promise<CheckoutOrderModel[]> {
        return this.http
            .post(this.checkoutOrderUrl, JSON.stringify(checkoutOrder), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError (error : any):Promise<any> {
        console.error('An error occured ', error);
        return Promise.reject(error.message || error);
    }
}