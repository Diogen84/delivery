import { Component } from '@angular/core';
import { Category } from './categoryModel';
import { CategoryService } from './categoryService';

@Component({
    selector: 'category-list',
    template: `
    <ul class="categories">
      <li *ngFor="let category of categories" [class.selected]="category === selectedCategory" (click)="onSelect(category)">
        <span class="badge">{{category.id}}</span> {{category.name}}
      </li>
    </ul>
    <category-detail [category]="selectedCategory"></category-detail>
    `,
    providers: [CategoryService]
})

export class CategoryList {
    categories: Category[];
    selectedCategory : Category;
    //addservice via constructor
    constructor(private categoryService: CategoryService) {}

    onSelect(category: Category) : void {
        this.selectedCategory = category;
    }

    getCategories(): void {
        this.categoryService.getCategories().then(categories => this.categories = categories);
    }

    ngOnInit(): void {
        this.getCategories();
    }

}

