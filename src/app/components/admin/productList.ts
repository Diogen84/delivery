import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductModel } from '../../models/productModel';
import { RelationModel } from '../../models/relationModel';
import { CategoryItem } from '../../models/selectedCategoriesModel';

import { RelationService } from '../../services/relationService';
import { ProductService } from '../../services/productService';
import { CategoryService } from '../../services/categoryService';


@Component({
	moduleId: module.id,
	selector: 'div.product-list',
	template: `
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
                      <div class="search-section" product-search></div>

                      <div class="admin-content">
                          <ul class="data-table">
                              <li class="heading">
                                    <div class="number">#</div>
                                    <div class="id">ID</div>
                                    <div class="options">Options</div>
                                    <div class="trigger">Lock</div>
                                    <div class="created">Created</div>
                                    <div class="edited">Edited</div>
                                    <div class="name">Name</div>
                              </li>
                              <li *ngFor="let product of products; let index = index" [class.selected]="product === selectedProduct">
                              <!--[routerLink]="['/admin/products/' + product.id]">-->
                                  <div class="row">
                                      <div class="number">{{index}}</div>
                                      <div class="id">{{product.id}}</div>
                                      <div class="options">
                                          <div>
                                              <a href="#" (click)="gotoDetail(product); $event.stopPropagation(); $event.preventDefault();">Edit</a>
                                              <a href="#" (click)="delete(product); $event.stopPropagation(); $event.preventDefault();">Remove</a>
                                          </div>
                                      </div>
                                      <div class="trigger"><input type="checkbox" [(ngModel)]="product.lockField" name="lockField" (change)="save(product)" /></div>
                                      <div class="created">{{product.created}}</div>
                                      <div class="edited">{{product.edited}}</div>
                                      <div class="name">{{product.name}}</div>
                                  </div>
                              </li>
                          </ul>

                          <button *ngIf="!openedAddBox" (click)="openAddBox()">Add</button>
                          <div class="createNewRow" *ngIf="openedAddBox">
                              <h3>Create new product (id = {{newProduct.id}})</h3>
                              <form #createProductForm="ngForm" *ngIf="openedAddBox" 
                              (ngSubmit)="onSubmitNewProductForm(createProductForm.value)">
                                  <fieldset>    
                                      <ul class="data-table">
                                          <li>
                                              <div class="detail">
                                                  <div class="row">
                                                      <div class="label"><label for="name">Name:{{newProduct.name}}</label></div>
                                                      <div class="field">
                                                          <input type="text" [(ngModel)]="newProduct.name" 
                                                          name="name" #name="ngModel" required />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="lockField">Lock: <br />{{newProduct.lockField}}</label></div>
                                                      <div class="field">
                                                          <input [(ngModel)]="newProduct.lockField" name="lockField" #lockField="ngModel" type="checkbox" />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="thumbnail">Thumbnail:<br />{{newProduct.thumbnail}}</label></div>
                                                      <div class="field">
                                                          <input type="text" [(ngModel)]="newProduct.thumbnail" 
                                                          name="thumbnail" #thumbnail="ngModel" />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="inStock">Items in stock: <br />
                                                      {{newProduct.inStock}}</label></div>
                                                      <div class="field">
                                                          <input type="text" [(ngModel)]="newProduct.inStock" name="inStock" #lock="ngModel" type="text" />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="price">Price: <br />
                                                      {{newProduct.price}}</label></div>
                                                      <div class="field">
                                                          <input type="text" [(ngModel)]="newProduct.price" name="price" #lock="ngModel" type="text" />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="currency">Currency: <br />
                                                      {{newProduct.currency}}</label></div>
                                                      <div class="field">
                                                          <input type="text" [(ngModel)]="newProduct.currency" name="currency" #lock="ngModel" type="text" />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="weight">Weight: <br />{{newProduct.weight}}</label></div>
                                                      <div class="field">
                                                          <input type="text" [(ngModel)]="newProduct.weight" name="weight" #lock="ngModel" type="text" />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="selectedCategories">Assigned categories:</label></div>
                                                      <div class="field">
                                                          <!--select multiple id="newCategoryProducts_related">
                                                              <option>Category1</option>
                                                              <option>Category2</option>
                                                              <option>Category3</option>
                                                              <option>Category4</option>
                                                          </select-->
                                                          <select multiple [(ngModel)]="selectedCategories" name="selectedCategory">
                                                              <option *ngFor="let category of categoryList" [ngValue]="category">{{category.name}}</option>
                                                          </select>
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="shortDescription">Short description: 
                                                      <br />{{newProduct.shortDescription}}</label></div>
                                                      <div class="field">
                                                          <textarea [(ngModel)]="newProduct.shortDescription" 
                                                          name="shortDescription" #shortDescription="ngModel"></textarea>
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="description">Description: 
                                                      <br />{{newProduct.description}}</label></div>
                                                      <div class="field">
                                                          <textarea [(ngModel)]="newProduct.description" 
                                                          name="description" #description="ngModel"></textarea>
                                                      </div>
                                                  </div>
                                              </div>
                                          </li>
                                      </ul>
                                      <div class="buttons">
                                          <button type="submit" class="btn" [disabled]="!createProductForm.valid">
                                              Create new product</button> 
                                          <a href="#" class="btn" 
                                          (click)="editCancel();$event.stopPropagation();$event.preventDefault()">Cancel</a>
                                      </div>
                                  </fieldset>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
	`
})

export class ProductList {
    private newProduct : ProductModel = new ProductModel();
    products: ProductModel[];
    selectedProduct : ProductModel;
    openedAddBox : boolean;
    selectedCategories: CategoryItem[] = [];
    categoryList: CategoryItem[] = [];

    localRelations: RelationModel[];
    relation: RelationModel;

    //addservice via constructor
    constructor(
        private categoryService: CategoryService,
        private relationService: RelationService,
        private router: Router,
        private productService: ProductService
    ) {}

    openAddBox() : void {
        this.openedAddBox = true;
    }

    onSubmitNewProductForm() {
        let min = Math.ceil(10);
        let max = Math.floor(100);
        let time = new Date();

        this.newProduct.created = time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear();
        this.newProduct.edited = this.newProduct.created;
        //console.log(this.selectedCategories);
        console.log(this.selectedCategories);
        this.productService.createProduct(this.newProduct)
            .then(product => {
                this.products.push(product);
                this.selectedProduct = null;

                for ( let z = 0 ; z < this.selectedCategories.length ; z++ ) {
                    this.relation = new RelationModel();
                    this.relation = {
                        productId: product.id,
                        categoryId: this.selectedCategories[z].value
                    };
                    console.log(this.relation);
                    this.relationService.createRelationsOfProduct(this.relation).then(res => {
                        console.log(res);
                    });
                }
            });
        this.openedAddBox = false;
    }

    delete(product: ProductModel): void {
        this.productService
            .delete(product.id)
            .then(() => {
                this.products = this.products.filter(h => h !== product);
                if (this.selectedProduct === product) { this.selectedProduct = null; }
            });
    }
    ngOnInit(): void {
        this.productService.getProducts().then(
            products => {
                //console.log(products);
                this.products = products;

                this.categoryService.getCategories()
                    .then(response => {
                        for ( let i = 0 ; i < response.length ; i++ ) {
                            this.categoryList.push(new CategoryItem(response[i].id, response[i].name));
                        }
                        //console.log(response);
                        /*this.relationService.getRelationsOfProduct(this.product.id)
                            .then(res => {
                                console.log(res);
                                this.localRelations = res;
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
                            });*/
                    });
            }
        );
        this.openedAddBox = false;
    }
    onSelect(product: ProductModel) : void {
        this.selectedProduct = product;
    }
    gotoDetail(product: ProductModel): void {
        this.selectedProduct = product;
        this.router.navigate(['admin/products', this.selectedProduct.id]);
    }
    editCancel(): void {
        this.openedAddBox = false;
    }
    save(product: ProductModel): void {
        this.productService.update(product);
    }
}