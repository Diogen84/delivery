import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Product } from '../../admin/product/productModel';
import { ProductService } from '../../admin/product/productService';

import { Relation } from '../../shared/relationModel';
import { RelationService } from '../../shared/relationService';

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
                        <ul class="options">
                            <li><a href="#/products/{{product.id}}" (click)="gotoDetail(product); $event.stopPropagation();$event.preventDefault();">Details</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class Products {
    relations : Relation[] = [];
    products : Product[] = [];
    product : Product;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private productService: ProductService,
        private relationService: RelationService
    ) {}

    gotoDetail(product: Product): void {
        this.router.navigate(['products/', product.id]);
    }
    ngOnInit(): void {
        this.route.params.switchMap((params: Params) => this.relationService.getRelationsOfCategory(+params['id']))
            .subscribe(relations => {
                for ( let i = 0 ; i < relations.length ; i++ ) {
                    this.productService.getProduct(relations[i].productId).then(res => this.products.push(res) );
                }
            });

    }
}