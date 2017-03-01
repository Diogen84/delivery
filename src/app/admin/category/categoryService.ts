import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Category } from './categoryModel';

@Injectable()
export class CategoryService {
    private categoriesUrl = 'api/categories';  // URL to web api
    private categoryUrl = 'api/category-detail';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    update(category: Category): Promise<Category> {
        const url = `${this.categoryUrl}/${category.id}`;
        return this.http
            .put(url, JSON.stringify(category), {headers: this.headers})
            .toPromise()
            .then(() => category)
            .catch(this.handleError);
    }


    getCategories(): Promise<Category[]> {
        //return Promise.resolve(CATEGORIES);
        return this.http.get(this.categoriesUrl)
            .toPromise()
            .then(response => response.json().data as Category[])
            .catch(this.handleError);
    }

    private handleError (error : any):Promise<any> {
        console.error('An error occured ', error);
        return Promise.reject(error.message || error);
    }

    getCategory(id: number): Promise<Category> {
        const url = `${this.categoryUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Category)
            .catch(this.handleError);

        /*return this.getCategories()
            .then(categories => categories.find(category => category.id === id));
            */
    }



    /*
    // See the "Take it slow" appendix
    getCategoriesSlowly(): Promise<Category[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getCategories()), 2000);
        });
    }*/

}