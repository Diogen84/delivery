import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { CategoryModel } from '../../models/categoryModel';
import { CategoryService } from '../../services/categoryService';

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
                            <li><a href="#/admin/orderList">Order list</a></li>
                        </ul>
                    </div>
                    <div class="right-section">
                        <div class="search-section" category-search></div>
                        <div class="admin-content">
                            <form #editCategoryForm="ngForm" *ngIf="category" (ngSubmit)="onSubmitEditCategoryForm(editCategoryForm.value)">
                                <fieldset>
                                    <div><label>Id: </label>{{category.id}}</div>
                                    <div>
                                        <label>Name:{{category.name}}</label>
                                        <div>
                                            <input [(ngModel)]="category.name" name="name" />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Thumbnail: <br />{{category.thumbnail}}</label>
                                        <div>
                                            <input [(ngModel)]="category.thumbnail" name="thumbnail" />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Short description: <br />{{category.shortDescription}}</label>
                                        <div>
                                            <input [(ngModel)]="category.shortDescription" name="shortDescription" #shortDescription="ngModel" />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Description: <br />{{category.description}}</label>
                                        <div>
                                            <input [(ngModel)]="category.description" name="description" />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Lock: <br />{{category.lockField}}</label>
                                        <div>
                                            <input [(ngModel)]="category.lockField" type="checkbox" name="lockField" />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Created: <br />{{category.created}}</label>
                                        <div>
                                            <input [(ngModel)]="category.created" name="created" />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Edited: <br />{{category.edited}}</label>
                                        <div>
                                            <input [(ngModel)]="category.edited" name="edited" />
                                        </div>
                                    </div>
                                    <button (click)="goBack()">Back</button>
                                    <input type="submit" value="Save" />
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class CategoryDetail implements OnInit {
    category: CategoryModel;

    constructor(
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.categoryService.getCategory(+params['id']))
            .subscribe(category => {
                console.log(category);
                this.category = category[0];
                console.log(this.category);
            });
    }

    save(): void {
        this.categoryService.update(this.category)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }

    onSubmitEditCategoryForm(): void {
        this.save();
    }
}