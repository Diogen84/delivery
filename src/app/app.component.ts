import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <!-- add here more links to page routings with name of directives -->
    <a routerLink="admin/categories">CategoryList</a>
    <a routerLink="admin/category-detail/1">Category1</a>
    <a routerLink="admin/category-detail/2">Category2</a>
    <a routerLink="admin/category-detail/3">Category3</a>
    <router-outlet></router-outlet>`
})

export class AppComponent {
    title = 'Tour of Heroes';
}