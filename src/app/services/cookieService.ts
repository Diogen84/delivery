import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { OrderModel } from '../models/orderModel';

@Injectable()
export class CookieService {
    cookie : string;

    private order: OrderModel[] = [];

    getCookie(name:string) : string {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        if (matches) {
            return decodeURIComponent(matches[1]);
        } else {
            return undefined;
        }
        //return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    setCookie(name:string, value:string, options:any) : void {
        options = options || {};
        let expires = options.expires;
        if (typeof expires === "number" && expires) {
            let d = new Date();
             d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        let updatedCookie = name + "=" + value;
        for ( let i = 0 ; i < options.length ; i++ ) {
            let propName = options[i];
            updatedCookie += "; " + propName;
            let propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    }
    checkCookies(cookieArray : OrderModel[], newArray : OrderModel) : OrderModel[] {
        let result = [];
        if (cookieArray.length > 0) {

            let flag = false;
            for ( let i = 0 ; i < cookieArray.length ; i++ ) {
                if (cookieArray[i].productId === newArray.productId) {
                    result.push({
                        productId: newArray.productId,
                        amount: newArray.amount
                    });
                    flag = true;
                } else {
                    result.push({
                        productId: cookieArray[i].productId,
                        amount: cookieArray[i].amount
                    });
                }
            }
            if (!flag) {
                result.push({
                    productId: newArray.productId,
                    amount: newArray.amount
                });
            }
        } else {
            result.push({
                productId: newArray.productId,
                amount: newArray.amount
            });
        }
        return result;
    }
}