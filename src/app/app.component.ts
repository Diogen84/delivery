import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: '[my-app]',
    template: `
        <header class="header" header-section></header>
        <div class="wrapper">
            <main class="main">
                <router-outlet></router-outlet>
            </main>

            <footer class="footer">
                <div class="holder">
                    <div class="footer-block">
                        <a href="/" class="footer-logo">Footer-logo</a>
                        <div class="footer-container">
                            <p>Some text here</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>  
    <!--<a routerLink="admin/categories" routerLinkActive="active">CategoryList</a>
    <a routerLink="admin/categories/1" routerLinkActive="active">Category1</a>
    <a routerLink="admin/categories/2" routerLinkActive="active">Category2</a>
    <a routerLink="admin/categories/3" routerLinkActive="active">Category3</a>-->`
})

export class AppComponent {}