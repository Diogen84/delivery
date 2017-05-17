import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CategoryModel }           from '../models/categoryModel';

@Injectable()
export class CategorySearchService {

    constructor(private http: Http) {}

    search(term: string): Observable<CategoryModel[]> {
        return this.http
            .get(`api/categories/?name=${term}`)
            .map(response => response.json().data as CategoryModel[]);
    }
}