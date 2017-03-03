import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { CategoryService } from './categoryService';
import { Category } from './categoryModel';

@Component({
    moduleId: module.id,
    selector:'div.category-detail',
    template:`
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
                            <div *ngIf="category">
                                <div><label>Id: </label>{{category.id}}</div>
                                <div>
                                  <label>Name:{{category.name}}</label>
                                  <div>
                                    <input [(ngModel)]="category.name" />
                                  </div>
                                </div>
                                <div>
                                  <label>Thumbnail: <br />{{category.thumbnail}}</label>
                                  <div>
                                    <input [(ngModel)]="category.thumbnail" />
                                </div>
                                </div>
                                <div>
                                  <label>Short description: <br />{{category.shortDescription}}</label>
                                  <div>
                                    <input [(ngModel)]="category.shortDescription" />
                                    </div>
                                </div>
                                <div>
                                  <label>Description: <br />{{category.description}}</label>
                                  <div>
                                  <input [(ngModel)]="category.description" />
                                  </div>
                                </div>
                                <div>
                                  <label>Lock: <br />{{category.lock}}</label>
                                  <div>
                                  <input [(ngModel)]="category.lock" type="checkbox" />
                                  </div>
                                </div>
                                <div>
                                  <label>Created: <br />{{category.created}}</label>
                                  <div>
                                  <input [(ngModel)]="category.created" />
                                  </div>
                                </div>
                                <div>
                                  <label>Edited: <br />{{category.edited}}</label>
                                  <div>
                                  <input [(ngModel)]="category.edited" />
                                  </div>
                                </div>
                                <button (click)="goBack()">Back</button>
                                <button (click)="save()">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    
    `
})

export class CategoryDetail implements OnInit {
    category: Category;

    constructor(
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.categoryService.getCategory(+params['id']))
            .subscribe(category => this.category = category );
    }

    save(): void {
        this.categoryService.update(this.category)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}