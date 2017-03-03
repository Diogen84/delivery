import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from './productModel';
import { ProductService } from './productService';

@Componenet({
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
                      </ul>
                  </div>
                  <div class="right-section">
                      <div class="search-section" category-search></div>

                      <div class="admin-content">
                          <ul class="data-table">
                              <li class="heading">
                                  <div class="number">#</div>
						            <div class="id">ID</div>
						            <div class="options">Options</div>
						            <div class="trigger">Lock</div>
						            <div class="name">Name</div>
                              </li>
                              <li *ngFor="let product of products" [class.selected]="product === selectedProduct" 
                              [routerLink]="['/admin/products/' + product.id]">
                                  <div class="row">
                                      <div class="number">index</div>
                                      <div class="id">{{product.id}}</div>
                                      <div class="options">
                                          <div>
                                              <a href="#" (click)="gotoDetail(product); $event.stopPropagation(); 
                                              $event.preventDefault();">Edit</a>
                                              <a href="#" (click)="delete(product); $event.stopPropagation(); 
                                              $event.preventDefault();">Remove</a>
                                          </div>
                                      </div>
                                      <div class="trigger"><input type="checkbox" /></div>
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
                                                      <div class="label"><label for="lock">Lock: <br />{{newProduct.lock}}</label></div>
                                                      <div class="field">
                                                          <input type="text" [(ngModel)]="newProduct.lock" 
                                                          name="lock" #lock="ngModel" type="checkbox" />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="thumbnail">Thumbnail: 
                                                      <br />{{newProduct.thumbnail}}</label></div>
                                                      <div class="field">
                                                          <input type="text" [(ngModel)]="newCategory.thumbnail" 
                                                          name="thumbnail" #thumbnail="ngModel" />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="newCategoryProducts_related">
                                                      Related products</label></div>
                                                      <div class="field">
                                                          <select multiple id="newCategoryProducts_related" >
                                                              <option>Category1</option>
                                                              <option>Category2</option>
                                                              <option>Category3</option>
                                                              <option>Category4</option>
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
                                          <a href="#" class="btn" data-ng-click="editCancel($event, product)">Cancel</a>
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
    newProduct = new Product();
    products: Product[];
    selectedProduct : Product;
    openedAddBox : boolean;
    //addservice via constructor

    constructor(
        private router: Router,
        private productService: ProductService
    ) {}

    openAddBox() : void {
        this.openedAddBox = true;
    }

    onSubmitNewCategoryForm() {
        let min = Math.ceil(10);
        let max = Math.floor(100);
        let time = new Date();

        this.newProduct.id = Math.floor(Math.random() * (max - min + 1 )) + min;
        this.newProduct.created = time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear();
        this.newProduct.edited = this.newProduct.created;
        this.categoryService.createCategory(this.newCategory)
            .then(category => {
                this.categories.push(category);
                this.selectedCategory = null;
            });
        this.openedAddBox = false;
    }
    getCategories(): void {
        this.categoryService
            .getCategories()
            .then(categories => this.categories = categories);
    }

    delete(category: Category): void {
        this.categoryService
            .delete(category.id)
            .then(() => {
                this.categories = this.categories.filter(h => h !== category);
                if (this.selectedCategory === category) { this.selectedCategory = null; }
            });
    }
    ngOnInit(): void {
        this.getCategories();
        this.openedAddBox = false;
    }
    onSelect(category: Category) : void {
        this.selectedCategory = category;
    }
    gotoDetail(category: Category): void {
        this.selectedCategory = category;
        this.router.navigate(['admin/categories', this.selectedCategory.id]);
    }
}