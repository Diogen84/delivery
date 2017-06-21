import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { CategoryModel } from '../models/categoryModel';
import { ProductModel } from '../models/productModel';
import { RelationModel } from '../models/relationModel';

@Injectable()
export class RelationService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private relationUrl = 'http://localhost:3000/relation'; //'api/relation';
   // private categoryUrl = 'api/categories';

    constructor(private http: Http) { }

    getRelations(): Promise<RelationModel[]> {
        return this.http.get(this.relationUrl)
            .toPromise()
            .then(response => response.json() as RelationModel[])
            .catch(this.handleError);
    }
    getRelationsOfProduct(productId : number) : Promise<RelationModel[]> {
        const url = `${this.relationUrl}/${productId}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as RelationModel[])
            .catch(this.handleError);
    }
    createRelationsOfProduct(relation : RelationModel) : Promise<RelationModel> {
        return this.http
            .post(this.relationUrl, JSON.stringify(relation))
            .toPromise()
            .then(res => res.json() as RelationModel)
            .catch(this.handleError);
    }
    deleteRelationsOfProduct(id: number): Promise<void> {
        const url = `${this.relationUrl}`;
        return this.http
            .post(url, JSON.stringify({id: id}))
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getRelationsOfCategory(categoryId : number) : Promise<RelationModel[]> {
        const url = `${this.relationUrl}?categoryId=${categoryId}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as RelationModel[])
            .catch(this.handleError);
    }





/*
    getRelationsOfCategory(categoryId : number) : Promise<Relation[]> {
        const url = `${this.relationUrl}?productId=${categoryId}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Relation[])
            .catch(this.handleError);
    }
*/

    private handleError (error : any):Promise<any> {
        console.error('An error occured ', error);
        return Promise.reject(error.message || error);
    }


// for store with a 'heroes' collection
//GET api/heroes          // all heroes
//GET api/heroes/42       // the character with id=42
//GET api/heroes?name=^j  // 'j' is a regex; returns heroes whose name contains 'j' or 'J'
//GET api/heroes.json/42  // ignores the ".json"


/*

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
    }*/
}