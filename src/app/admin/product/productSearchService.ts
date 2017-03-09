import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Product }           from './productModel';

@Injectable()
export class ProductSearchService {

    constructor(private http: Http) {}

    search(term: string): Observable<Product[]> {
        return this.http
            .get(`api/products/?name=${term}`)
            .map(response => response.json().data as Product[]);
    }
}