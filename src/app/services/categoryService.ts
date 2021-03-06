import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { CategoryModel } from '../models/categoryModel';

@Injectable()
export class CategoryService {

    private headers = new Headers({'Content-Type': 'application/json'});
    // URL to web api
    private categoriesUrl = 'http://localhost:3000/categories'; //'api/categories';

    constructor(private http: Http) { }

    getCategories(): Promise<CategoryModel[]> {
        return this.http.get(this.categoriesUrl)
            .toPromise()
            //.then(response => response.json().data as CategoryModel[])
            .then(response => response.json() as CategoryModel[])
            .catch(this.handleError);
    }

    getCategory(id: number): Promise<CategoryModel> {
        const url = `${this.categoriesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as CategoryModel)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.categoriesUrl}/delete/`;
        return this.http
            .post(url, JSON.stringify({id: id}))
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    createCategory(category : any) : Promise<CategoryModel> {
        return this.http
            .post(this.categoriesUrl, JSON.stringify(category))
            .toPromise()
            .then(function(res) {
                return res.json();
            })
            .catch(this.handleError);
    }
    update(category: CategoryModel): Promise<CategoryModel> {
        const url = `${this.categoriesUrl}/update/`;
        return this.http
            .post(url, JSON.stringify(category))
            .toPromise()
            .then(function(res) {
                return res.json();
            })
            .catch(this.handleError);
    }

    private handleError (error : any):Promise<any> {
        console.error('An error occured ', error);
        return Promise.reject(error.message || error);
    }
}