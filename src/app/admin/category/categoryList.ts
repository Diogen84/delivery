import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from './categoryModel';
import { CategoryService } from './categoryService';

@Component({
    moduleId: module.id,
    selector: 'div.category-list',
    template: `
      <div class="admin">
          <div class="admin-pic">
              <img src="images/gallery1.png" alt="" />
          </div>
          <div class="admin-area">
              <div class="holder">
                  <div class="left-section">
                      <ul class="admin-menu">
                          <li><a href="admin/profiles">Profiles</a></li>
                          <li><a href="admin/categories">Categories</a></li>
                          <li><a href="admin/products">Products</a></li>
                      </ul>
                  </div>
                  <div class="right-section">
                      <div class="search">
                        <category-search></category-search>
                      </div>

                      <ul class="categories">
                        <li *ngFor="let category of categories" [class.selected]="category === selectedCategory" 
                        [routerLink]="['/admin/categories/' + category.id]">
                          <span (click)="onSelect(category)">{{category.id}} {{category.name}}</span>
                          <button class="delete" (click)="delete(category); $event.stopPropagation()">x</button>
                        </li>
                      </ul>   
                      <div *ngIf="selectedCategory">
                        <h2>
                          {{selectedCategory.name | uppercase}} is my category
                        </h2>
                        <button (click)="gotoDetail()">View Details</button>
                      </div>
                      <button *ngIf="!openedAddBox" (click)="openAddBox()">Add</button>
                      <form #createCategoryForm="ngForm" *ngIf="openedAddBox" 
                      (ngSubmit)="onSubmitNewCategoryForm(createCategoryForm.value)">
                          <div><label>Id: </label>{{newCategory.id}}</div>
                          <div>
                            <label for="name">Name:{{newCategory.name}}</label>
                            <div>
                              <input type="text" [(ngModel)]="newCategory.name" name="name" #name="ngModel" required />
                            </div>
                          </div>
                          <div>
                            <label for="thumbnail">Thumbnail: <br />{{newCategory.thumbnail}}</label>
                            <div>
                              <input type="text" [(ngModel)]="newCategory.thumbnail" name="thumbnail" #thumbnail="ngModel" />
                          </div>
                          </div>
                          <div>
                            <label for="shortDescription">Short description: <br />{{newCategory.shortDescription}}</label>
                            <div>
                              <input type="text" [(ngModel)]="newCategory.shortDescription" 
                              name="shortDescription" #shortDescription="ngModel" />
                              </div>
                          </div>
                          <div>
                            <label for="description">Description: <br />{{newCategory.description}}</label>
                            <div>
                            <input type="text" [(ngModel)]="newCategory.description" name="description" #description="ngModel" />
                            </div>
                          </div>
                          <div>
                            <label for="lock">Lock: <br />{{newCategory.lock}}</label>
                            <div>
                            <input type="text" [(ngModel)]="newCategory.lock" name="lock" #lock="ngModel" type="checkbox" />
                            </div>
                          </div>
                          <div>
                            <label for="created">Created: <br />{{newCategory.created}}</label>
                            <div>
                            <input type="text" [(ngModel)]="newCategory.created" name="created" #created="ngModel" />
                            </div>
                          </div>
                          <div>
                            <label for="edited">Edited: <br />{{newCategory.edited}}</label>
                            <div>
                            <input type="text" [(ngModel)]="newCategory.edited" name="edited" #edited="ngModel" />
                            </div>
                          </div>
                          <button type="submit" [disabled]="!createCategoryForm.valid">Save</button> 
                      </form>
                  </div>
              </div>
          </div>
      </div>







    `
})

export class CategoryList {
    newCategory = new Category();
    categories: Category[];
    selectedCategory : Category;
    openedAddBox : boolean;
    //addservice via constructor

    constructor(
        private router: Router,
        private categoryService: CategoryService
    ) {}

    openAddBox() : void {
        this.openedAddBox = true;
    }

    onSubmitNewCategoryForm() {
        let min = Math.ceil(10);
        let max = Math.floor(100);

        this.newCategory.id = Math.floor(Math.random() * (max - min + 1 )) + min;
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
    gotoDetail(): void {
        this.router.navigate(['admin/categories', this.selectedCategory.id]);
    }
}

