import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from './categoryModel';
import { CategoryService } from './categoryService';

@Component({
    moduleId: module.id,
    selector: 'category-list',
    template: `
    <ul class="categories">
      <li *ngFor="let category of categories" [class.selected]="category === selectedCategory" (click)="onSelect(category)">
        <span class="badge">{{category.id}}</span> {{category.name}}
      </li>
    </ul>
    
    
    <div *ngIf="selectedCategory">
      <h2>
        {{selectedCategory.name | uppercase}} is my category
      </h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>
    <!--<category-detail [category]="selectedCategory"></category-detail>-->
    `
})

export class CategoryList {
    categories: Category[];
    selectedCategory : Category;
    //addservice via constructor
    constructor(
        private router: Router,
        private categoryService: CategoryService
    ) {}

    getCategories(): void {
        this.categoryService.getCategories().then(categories => this.categories = categories);
    }
    ngOnInit(): void {
        this.getCategories();
    }
    onSelect(category: Category) : void {
        this.selectedCategory = category;
    }
    gotoDetail(): void {
        this.router.navigate(['admin/category-detail', this.selectedCategory.id]);
    }
}

