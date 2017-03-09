import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '../../admin/category/categoryModel';
import { CategoryService } from '../../admin/category/categoryService';

@Component({
    moduleId: module.id,
    selector: 'div.index',
    template:`
        <div class="holder">
            <div class="gallery">
                <img src="images/gallery1.png" alt="" />
            </div>
            <div class="reference">
                <div class="holder">
                    <div class="reference-block" *ngFor="let category of categories">
                        <div class="picture">
                            <img src="{{category.thumbnail}}" alt="" />
                        </div>
                        <div class="description">
                            <p>{{category.shortDescription}}</p>
                        </div>
                        <ul class="options">
                            <li><a href="#">Buy in one click</a></li>
                            <li><a href="#" (click)="productDetails(product.id);$event.preventDefault()">Details</a></li>
                            <li><a href="#">Add to favorites</a></li>
                            <li><a href="#">Remove from favorites</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class Index {
    categories : Category[];

    constructor(
        private router: Router,
        private categoryService: CategoryService
    ) {}

    gotoDetail(category: Category): void {
        this.router.navigate(['admin/categories', category.id]);
    }
    getCategories(): void {
        this.categoryService
            .getCategories()
            .then(categories => this.categories = categories);
    }
    ngOnInit(): void {
        this.getCategories();
    }
}