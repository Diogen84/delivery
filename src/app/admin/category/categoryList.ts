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
        <span class="badge">{{category.id}}</span> <span>{{category.name}}</span>
        <button class="delete" (click)="delete(hero); $event.stopPropagation()">x</button>
      </li>
    </ul>   
    <button (click)="add(category.name); category.name=''">Add</button>
    <div *ngIf="selectedCategory">
      <h2>
        {{selectedCategory.name | uppercase}} is my category
      </h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>`
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
        this.categoryService
            .getCategories()
            .then(categories => this.categories = categories);
    }
    add(name: string): void {
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
    }
    onSelect(category: Category) : void {
        this.selectedCategory = category;
    }
    gotoDetail(): void {
        this.router.navigate(['admin/categories', this.selectedCategory.id]);
    }
}

