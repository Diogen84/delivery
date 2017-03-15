import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from '../../admin/product/productModel';
import { ProductService } from '../../admin/product/productService';

@Component({
    moduleId: module.id,
    selector: 'div.products',
    template:`
        <div class="product-details">
            <div class="holder">
                <div class="top-section">
                    <div class="visual">
                        <ul class="img">
                            <li><img src="" alt="" /></li>
                        </ul>
                        <ul class="img-switch">
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/product-reference1.png" alt="" /></a></li>
                        </ul>
                    </div>
                    <div class="description">
                        <h1>{{product.name}}</h1>
                        <ul>
                            <li>ID: </li>
                            <li>Weight: </li>
                            <li>Price: </li>
                            <li>In stock: </li>
                            <li>Quantity: <form><fieldset><input class="quantity" type="number" value="1" /><input type="submit" class="submit" value="Buy" /></fieldset></form></li>
                        </ul>
                        <ul class="options">
                            <li><a href="#">Add to favorites</a></li>
                            <li><a href="#">Remove from favorites</a></li>
                        </ul>
                        <div class="description-text">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="reference">
                <div class="holder">
                    <div class="reference-block">
                        <div class="picture">
                            <img src="images/product-reference1.png" alt="" />
                        </div>
                        <div class="description">
                            <p>Lorem ispum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                        </div>
                        <ul class="options">
                            <li><a href="#">Buy in one click</a></li>
                            <li><a href="#">Details</a></li>
                            <li><a href="#">Add to favorites</a></li>
                            <li><a href="#">Remove from favorites</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class ProductPage {
    product : Product;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.route.params.switchMap((params: Params) => this.productService.getProduct(+params['id']))
            .subscribe(product => {
                this.product = product;
                console.log(this);
            } );
    }
}