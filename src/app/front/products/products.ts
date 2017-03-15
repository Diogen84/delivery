import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../admin/product/productModel';
import { ProductService } from '../../admin/product/productService';

@Component({
    moduleId: module.id,
    selector: 'div.products',
    template:`
        <div class="holder">
            <div class="gallery">
                <img src="images/gallery1.png" alt="" />
            </div>
            <div class="reference">
                <div class="holder">
                    <div class="reference-block" *ngFor="let product of products">
                        <div class="picture">
                            <img src="{{product.thumbnail}}" alt="" />
                        </div>
                        <div class="description">
                            <p>{{product.shortDescription}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class Products {
    products : Product[];

    constructor(
        private router: Router,
        private productService: ProductService
    ) {}

    gotoDetail(product: Product): void {
        this.router.navigate(['admin/products', product.id]);
    }
    getProducts(): void {
        this.productService
            .getProducts()
            .then(products => this.products = products);
    }
    ngOnInit(): void {
        this.getProducts();
    }
}