import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Category }           from './categoryModel';

@Injectable()
export class CategorySearchService {

    constructor(private http: Http) {}

    search(term: string): Observable<Category[]> {
        return this.http
            .get(`api/categories/?name=${term}`)
            .map(response => response.json().data as Category[]);
    }
}