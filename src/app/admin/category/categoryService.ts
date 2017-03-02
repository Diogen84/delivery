import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Category } from './categoryModel';

@Injectable()
export class CategoryService {

    private headers = new Headers({'Content-Type': 'application/json'});
    // URL to web api
    private categoriesUrl = 'api/categories';

    constructor(private http: Http) { }

    getCategories(): Promise<Category[]> {
        return this.http.get(this.categoriesUrl)
            .toPromise()
            .then(response => response.json().data as Category[])
            .catch(this.handleError);
    }

    getCategory(id: number): Promise<Category> {
        const url = `${this.categoriesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Category)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.categoriesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    createCategory(category : any) : Promise<Category> {
        return this.http
            .post(this.categoriesUrl, JSON.stringify(category), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(category: Category): Promise<Category> {
        const url = `${this.categoriesUrl}/${category.id}`;
        return this.http
            .put(url, JSON.stringify(category), {headers: this.headers})
            .toPromise()
            .then(() => category)
            .catch(this.handleError);
    }

    private handleError (error : any):Promise<any> {
        console.error('An error occured ', error);
        return Promise.reject(error.message || error);
    }
}