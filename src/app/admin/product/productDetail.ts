import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { ProductService } from './productService';
import { Product } from './productModel';

import { Relation } from '../../shared/relationModel';
import { RelationService } from '../../shared/relationService';
import { CategoryItem } from '../../shared/selectedCategoriesModel';

import { Category } from '../../admin/category/categoryModel';
import { CategoryService } from '../../admin/category/categoryService';

@Component({
    moduleId: module.id,
    selector:'div.product-detail',
    template:`
        <div class="admin">
            <div class="admin-pic">
                <img src="images/gallery1.png" alt="" />
            </div>
            <div class="admin-area">
                <div class="holder">
                    <div class="left-section">
                        <ul class="admin-menu">
                            <li><a href="#/admin/profiles">Profiles</a></li>
                            <li><a href="#/admin/categories">Categories</a></li>
                            <li><a href="#/admin/products">Products</a></li>
                        </ul>
                    </div>
                    <div class="right-section">
                        <div class="search-section" category-search></div>
                        <div class="admin-content">
                            <form #editProductForm="ngForm" *ngIf="product">
                                <fieldset>
                                    <div><label>Id: </label>{{product.id}}</div>
                                    <div>
                                      <label for="name">Name:{{product.name}}</label>
                                      <div>
                                        <input [(ngModel)]="product.name" name="name" #name="ngModel" />
                                      </div>
                                    </div>
                                    <div>
                                      <label for="thimbnail">Thumbnail: <br />{{product.thumbnail}}</label>
                                      <div>
                                        <input [(ngModel)]="product.thumbnail" name="thumbnail" #thumbnail="ngModel" />
                                    </div>
                                    </div>
                                    <div>
                                        <label for="shortDescription">Short description: <br />{{product.shortDescription}}</label>
                                        <div>
                                            <input [(ngModel)]="product.shortDescription" name="shortDescription" #shortDescription="ngModel" />
                                        </div>
                                    </div>
                                    <div>
                                      <label for="description">Description: <br />{{product.description}}</label>
                                      <div>
                                        <input [(ngModel)]="product.description" name="description" #description="ngModel" />
                                      </div>
                                    </div>
                                    <div class="row">
                                        <div class="label"><label for="selectedCategory">Related products</label>
                                        </div>
                                        <div class="field">
                                            <select multiple [(ngModel)]="selectedCategories" name="selectedCategory">
                                                <option *ngFor="let category of categoryList" [ngValue]="category">{{category.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                      <label for="lock">Lock: <br />{{product.lock}}</label>
                                      <div>
                                      <input [(ngModel)]="product.lock" name="lock" #lock="ngModel" type="checkbox" />
                                      </div>
                                    </div>
                                    <button (click)="goBack()">Back</button>
                                    <button (click)="save()">Save</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class ProductDetail implements OnInit {
    product: Product;
    selectedCategories: CategoryItem[] = [];
    categoryList: CategoryItem[] = [];

    relations: Relation[];

    constructor(
        private categoryService: CategoryService,
        private relationService: RelationService,
        private productService: ProductService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        let self = this;

        this.route.params
            .switchMap((params: Params) => this.productService.getProduct(+params['id']))
            .subscribe(product => {
                this.product = product;
                this.categoryService.getCategories()
                    .then(response => {
                        for ( let i = 0 ; i < response.length ; i++ ) {
                            this.categoryList.push(new CategoryItem(response[i].id, response[i].name));
                        }
                        this.relationService.getRelationsOfProduct(this.product.id)
                            .then(res => {
                                this.selectedCategories = [];
                                for ( let i = 0; i < res.length ; i++ ) {
                                    if ( this.product.id === res[i].productId ) {
                                        for ( let j = 0 ; j < this.categoryList.length ; j++ ) {
                                            if (res[i].categoryId === this.categoryList[j].value) {
                                                console.log(this.categoryList[j]);
                                                //console.log(self.categoryList[j]);
                                                this.selectedCategories.push(this.categoryList[j]);
                                            }
                                        }
                                    }
                                }
                            });
                    });
            });
    }







    save(): void {
        this.productService.update(this.product)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}