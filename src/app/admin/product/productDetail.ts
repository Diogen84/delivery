import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { ProductService } from './productService';
import { Product } from './productModel';

import { Relation } from '../../shared/relationModel';
import { RelationService } from '../../shared/relationService';
import { SelectedCategoryItem } from '../../shared/selectedCategoriesModel';

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
                            <div *ngIf="product">
                                <div><label>Id: </label>{{product.id}}</div>
                                <div>
                                  <label>Name:{{product.name}}</label>
                                  <div>
                                    <input [(ngModel)]="product.name" />
                                  </div>
                                </div>
                                <div>
                                  <label>Thumbnail: <br />{{product.thumbnail}}</label>
                                  <div>
                                    <input [(ngModel)]="product.thumbnail" />
                                </div>
                                </div>
                                <div>
                                  <label>Short description: <br />{{product.shortDescription}}</label>
                                  <div>
                                    <input [(ngModel)]="product.shortDescription" />
                                    </div>
                                </div>
                                <div>
                                  <label>Description: <br />{{product.description}}</label>
                                  <div>
                                  <input [(ngModel)]="product.description" />
                                  </div>
                                </div>
                                <div class="row">
                                    <div class="label"><label for="newCategoryProducts_related">
                                        Related products</label>
                                    </div>
                                    <div class="field">
                                        <select multiple [(ngModel)]="selectedCategories">
                                            <option *ngFor="let category of categoryList" value="category.id">{{category.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                  <label>Lock: <br />{{product.lock}}</label>
                                  <div>
                                  <input [(ngModel)]="product.lock" type="checkbox" />
                                  </div>
                                </div>
                                <div>
                                  <label>Created: <br />{{product.created}}</label>
                                  <div>
                                  <input [(ngModel)]="product.created" />
                                  </div>
                                </div>
                                <div>
                                  <label>Edited: <br />{{product.edited}}</label>
                                  <div>
                                  <input [(ngModel)]="product.edited" />
                                  </div>
                                </div>
                                <button (click)="goBack()">Back</button>
                                <button (click)="save()">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class ProductDetail implements OnInit {
    product: Product;
    categoryList: {id: number, name: string}[] = [];
    selectedCategories: SelectedCategoryItem[] = [];
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
                            this.categoryList.push({
                                id: response[i].id,
                                name: response[i].name
                            });
                        }
                        this.relationService.getRelationsOfProduct(this.product.id)
                            .then(selectedCategories => {
                                for ( let j = 0 ; j < selectedCategories.length ; j++ ) {
                                    for ( let i = 0 ; i < self.categoryList.length ; i++ ) {
                                        if (selectedCategories[j].categoryId === self.categoryList[i].id) {
                                            self.selectedCategories.push({
                                                id: self.categoryList[i].id,
                                                name: self.categoryList[i].name
                                            });
                                        }
                                    }
                                }
                                console.log(self);
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