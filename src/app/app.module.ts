import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule }     from './app.router';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './simulated-api/in-memory-data.service';


import { HeaderSection } from './shared/headerSection';
import { Index } from './front/index/index';
import { Categories } from './front/categories/categories';
import { AppComponent } from './app.component';

import { CategoryList } from './admin/category/categoryList';
import { CategoryDetail } from './admin/category/categoryDetail';
import { CategorySearch } from './admin/category/categorySearch';
import { CategoryService } from './admin/category/categoryService';

import { ProductList } from './admin/product/productList';
import { ProductDetail } from './admin/product/productDetail';
import { ProductSearch } from './admin/product/productSearch';
import { ProductService } from './admin/product/productService';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule
    ],
    declarations: [
        Index,
        Categories,
        HeaderSection,

        ProductList,
        ProductDetail,
        ProductSearch,

        CategorySearch,
        AppComponent,
        CategoryList,
        CategoryDetail
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CategoryService,
        ProductService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }