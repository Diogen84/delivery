import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { ProductService } from '../../services/productService';
import { RelationService } from '../../services/relationService';
import { CategoryService } from '../../services/categoryService';

import { ProductModel } from '../../models/productModel';
import { RelationModel } from '../../models/relationModel';
import { CategoryItem } from '../../models/selectedCategoriesModel';


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
                            <li><a href="#/admin/orderList">Order list</a></li>
                        </ul>
                    </div>
                    <div class="right-section">
                        <div class="search-section" category-search></div>
                        <div class="admin-content">
                            <form #editProductForm="ngForm" *ngIf="product" (ngSubmit)="onSubmitNewProductForm(editProductForm.value)">
                                <fieldset>
                                    <ul class="data-table">
                                          <li>
                                              <div class="detail">
                                                  <div class="row">
                                                      <div class="label"><label for="name">Name:{{product.name}}</label></div>
                                                      <div class="field">
                                                           <input [(ngModel)]="product.name" name="name" #name="ngModel" />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="thimbnail">Thumbnail: <br />{{product.thumbnail}}</label></div>
                                                      <div class="field">
                                                          <input [(ngModel)]="product.thumbnail" name="thumbnail" #thumbnail="ngModel" />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="shortDescription">Short description: <br />{{product.shortDescription}}</label></div>
                                                      <div class="field">
                                                          <textarea [(ngModel)]="product.shortDescription" name="shortDescription" #shortDescription="ngModel"></textarea>
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="description">Description: <br />{{product.description}}</label></div>
                                                      <div class="field">
                                                          <textarea [(ngModel)]="product.description" name="description" #description="ngModel"></textarea>
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="selectedCategory">Related products</label></div>
                                                      <div class="field">
                                                          <select multiple [(ngModel)]="selectedCategories" name="selectedCategory">
                                                            <option *ngFor="let category of categoryList" [ngValue]="category">{{category.name}}</option>
                                                        </select>
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="lock">Lock: <br />{{product.lock}}</label></div>
                                                      <div class="field">
                                                          <input [(ngModel)]="product.lock" name="lock" #lock="ngModel" type="checkbox" />
                                                      </div>
                                                  </div>
                                              </div>
                                          </li>
                                      </ul>
                                      <div class="buttons">
                                          <button type="submit" class="btn" [disabled]="!editProductForm.valid">Save</button> 
                                          <a href="#" class="btn" (click)="goBack()">Cancel</a>
                                      </div>
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
    product: ProductModel = new ProductModel();
    selectedCategories: CategoryItem[] = [];
    categoryList: CategoryItem[] = [];

    localRelations: RelationModel[];
    relation: RelationModel;

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
                this.product = product[0];
                console.log(this.product);
                this.categoryService.getCategories()
                    .then(response => {
                        for ( let i = 0 ; i < response.length ; i++ ) {
                            this.categoryList.push(new CategoryItem(response[i].id, response[i].name));
                        }
                        this.relationService.getRelationsOfProduct(this.product.id)
                            .then(res => {
                                this.localRelations = res;
                                console.log(this.localRelations);
                                this.selectedCategories = [];
                                for ( let i = 0; i < res.length ; i++ ) {
                                    if ( this.product.id === res[i].productId ) {
                                        for ( let j = 0 ; j < this.categoryList.length ; j++ ) {
                                            if (res[i].categoryId === this.categoryList[j].value) {
                                                this.selectedCategories.push(this.categoryList[j]);
                                            }
                                        }
                                    }
                                }
                            });
                    });
            });
    }
    onSubmitNewProductForm(): void {
        this.productService.update(this.product)
            .then(() => {
                this.relationService.deleteRelationsOfProduct(this.product.id).then(res => {});
                for ( let i = 0 ; i < this.selectedCategories.length ; i++ ) {
                    let relation = {
                        productId: this.product.id,
                        categoryId: this.selectedCategories[i].value
                    };
                    this.relationService.createRelationsOfProduct(relation).then(res => {});
                }
                this.goBack();
            });
    }

    goBack(): void {
        this.location.back();
    }
}