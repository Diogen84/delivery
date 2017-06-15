import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { ProductModel } from '../models/productModel';

@Injectable()
export class ProductService {
	private headers = new Headers({'Content-Type': 'application/json'});
    // URL to web api
    private productsUrl = 'http://localhost:3000/products'; //api/products';

    constructor(private http: Http) { }

    getProducts(): Promise<ProductModel[]> {
        return this.http.get(this.productsUrl)
            .toPromise()
            .then(response => response.json() as ProductModel[])
            .catch(this.handleError);
    }

    getProduct(id: number): Promise<ProductModel> {
        const url = `${this.productsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as ProductModel)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.productsUrl}/delete/`;
        return this.http.post(url, JSON.stringify({id: id}))
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    createProduct(product : any) : Promise<ProductModel> {
        return this.http
            .post(this.productsUrl, JSON.stringify(product))
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

// need to redo for mysql case
    update(product: ProductModel): Promise<ProductModel> {
        const url = `${this.productsUrl}/${product.id}`;
        return this.http
            .put(url, JSON.stringify(product), {headers: this.headers})
            .toPromise()
            .then(() => product)
            .catch(this.handleError);
    }

    private handleError (error : any):Promise<any> {
        console.error('An error occured ', error);
        return Promise.reject(error.message || error);
    }
}