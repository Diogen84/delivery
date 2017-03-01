import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from './categoryModel';
import { CategoryService } from './categoryService';

@Component({
    moduleId: module.id,
    selector: 'category-list',
    template: `
    <ul class="categories">
      <li *ngFor="let category of categories" [class.selected]="category === selectedCategory">
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
    <div *ngIf="openedAddBox">
        <div><label>Id: </label>{{newCategory.id}}</div>
        <div>
          <label>Name:{{newCategory.name}}</label>
          <div>
            <input [(ngModel)]="newCategory.name" />
          </div>
        </div>
        <div>
          <label>Thumbnail: <br />{{newCategory.thumbnail}}</label>
          <div>
            <input [(ngModel)]="newCategory.thumbnail" />
        </div>
        </div>
        <div>
          <label>Short description: <br />{{newCategory.shortDescription}}</label>
          <div>
            <input [(ngModel)]="newCategory.shortDescription" />
            </div>
        </div>
        <div>
          <label>Description: <br />{{newCategory.description}}</label>
          <div>
          <input [(ngModel)]="newCategory.description" />
          </div>
        </div>
        <div>
          <label>Lock: <br />{{newCategory.lock}}</label>
          <div>
          <input [(ngModel)]="newCategory.lock" type="checkbox" />
          </div>
        </div> 
        <div>
          <label>Created: <br />{{newCategory.created}}</label>
          <div>
          <input [(ngModel)]="newCategory.created" />
          </div>
        </div>
        <div>
          <label>Edited: <br />{{newCategory.edited}}</label>
          <div>
          <input [(ngModel)]="newCategory.edited" />
          </div>
        </div>
        <button (click)="add(newCategory)">Save</button>
    </div>

`
})

export class CategoryList {
    categories: Category[];
    selectedCategory : Category;
    newCategory : Category;
    openedAddBox : boolean;
    //addservice via constructor

    constructor(
        private router: Router,
        private categoryService: CategoryService
    ) {}

    openAddBox() : void {
        this.openedAddBox = true;
    }

    getCategories(): void {
        this.categoryService
            .getCategories()
            .then(categories => this.categories = categories);
    }
    /*add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.categoryService.create(name)
            .then(category => {
                this.categories.push(category);
                this.selectedCategory = null;
            });
    }*/
    add(newCategory: Category): void {
        name = name.trim();
        if (!name) { return; }
        this.categoryService.create(name)
            .then(category => {
                this.categories.push(category);
                this.selectedCategory = null;
            });
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

