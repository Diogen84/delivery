import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <a routerLink="admin/categories" routerLinkActive="active">CategoryList</a>
    <a routerLink="admin/categories/1" routerLinkActive="active">Category1</a>
    <a routerLink="admin/categories/2" routerLinkActive="active">Category2</a>
    <a routerLink="admin/categories/3" routerLinkActive="active">Category3</a>
    <router-outlet></router-outlet>`
})

export class AppComponent {
    title = 'Tour of Heroes';
}