import { Component, Input } from '@angular/core';
import { Category } from './categoryModel';

@Component({
    selector:'category-detail',
    template:`
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
    </div>
    `
})

export class CategoryDetail {
    @Input() category: Category;
}