import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryModel } from '../../models/categoryModel';
import { CategoryService } from '../../services/categoryService';
import { SharedService } from '../../services/sharedService';

@Component({
    moduleId: module.id,
    selector: 'div.categories',
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
                            <li><a href="#/categories/{{category.id}}">Details</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class CategoryListPage {
    categories : CategoryModel[];

    constructor(
        private router: Router,
        private categoryService: CategoryService,
        private sharedService: SharedService
    ) {}

    gotoDetail(category: CategoryModel): void {
        this.router.navigate(['admin/categories', category.id]);
    }
    getCategories(): void {
        this.categoryService
            .getCategories()
            .then(categories => {
                this.categories = categories;
                console.log(categories);
            });
    }
    ngOnInit(): void {
        this.sharedService.publishCart();
        this.getCategories();
    }
}