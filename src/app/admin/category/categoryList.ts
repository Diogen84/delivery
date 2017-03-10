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
                                  <div class="created">Created</div>
                                  <div class="edited">Last edit</div>
                                  <div class="name">Name</div>
                              </li>
                              <li *ngFor="let category of categories" [class.selected]="category === selectedCategory"> 
                              <!--[routerLink]="['/admin/categories/' + category.id]">-->
                                  <div class="row">
                                      <div class="number">index</div>
                                      <div class="id">{{category.id}}</div>
                                      <div class="options">
                                          <a href="#" (click)="gotoDetail(category); $event.stopPropagation(); 
                                          $event.preventDefault();">Edit</a>
                                          <a href="#" (click)="delete(category); $event.stopPropagation(); 
                                          $event.preventDefault();">Remove</a>
                                      </div>
                                      <div class="trigger"><input type="checkbox" 
                                      [(ngModel)]="category.lock" name="lock" (change)="save(category)" /></div>
                                      <div class="created">{{category.created}}</div>
                                      <div class="edited">{{category.edited}}</div>
                                      <div class="name">{{category.name}}</div>
                                  </div>
                              </li>
                          </ul>

                          <button *ngIf="!openedAddBox" (click)="openAddBox()">Add</button>
                          <div class="createNewRow" *ngIf="openedAddBox">
                              <h3>Create new category (id = {{newCategory.id}})</h3>
                              <form #createCategoryForm="ngForm" *ngIf="openedAddBox" (ngSubmit)="onSubmitNewCategoryForm(createCategoryForm.value)">
                                  <fieldset>    
                                      <ul class="data-table">
                                          <li>
                                              <div class="detail">
                                                  <div class="row">
                                                      <div class="label"><label for="name">Name:{{newCategory.name}}</label></div>
                                                      <div class="field">
                                                          <input type="text" [(ngModel)]="newCategory.name" name="name" #name="ngModel" required />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="lock">Lock: <br />{{newCategory.lock}}</label></div>
                                                      <div class="field">
                                                          <input [(ngModel)]="newCategory.lock" name="lock" #lock="ngModel" type="checkbox" />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="thumbnail">Thumbnail:<br />{{newCategory.thumbnail}}</label></div>
                                                      <div class="field">
                                                          <input type="text" [(ngModel)]="newCategory.thumbnail" name="thumbnail" #thumbnail="ngModel" />
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="newCategoryProducts_related">Related products</label></div>
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
                                                      <div class="label"><label for="shortDescription">Short description:<br />{{newCategory.shortDescription}}</label></div>
                                                      <div class="field">
                                                          <textarea [(ngModel)]="newCategory.shortDescription" name="shortDescription" #shortDescription="ngModel"></textarea>
                                                      </div>
                                                  </div>
                                                  <div class="row">
                                                      <div class="label"><label for="description">Description:<br />{{newCategory.description}}</label></div>
                                                      <div class="field">
                                                          <textarea [(ngModel)]="newCategory.description" name="description" #description="ngModel"></textarea>
                                                      </div>
                                                  </div>
                                              </div>
                                          </li>
                                      </ul>
                                      <div class="buttons">
                                          <button type="submit" class="btn" [disabled]="!createCategoryForm.valid">Create new category</button> 
                                          <a href="#" class="btn" (click)="editCancel();$event.stopPropagation();$event.preventDefault()">Cancel</a>
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

export class CategoryList {
    private newCategory: Category = new Category();
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
        let time = new Date();

        this.newCategory.id = Math.floor(Math.random() * (max - min + 1 )) + min;
        this.newCategory.created = time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear();
        this.newCategory.edited = this.newCategory.created;
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
    editCancel(): void {
        this.openedAddBox = false;
    }
    save(category: Category): void {
        this.categoryService.update(category);
    }
}

