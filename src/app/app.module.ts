import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule }     from './app.router';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
//import { InMemoryDataService }  from './simulated-api/in-memory-data.service';


import { HeaderSection } from './shared/headerSection';
import { Index } from './components/front/indexPage';

import { AppComponent } from './app.component';

import { CategoryService } from './services/categoryService';
import { CategorySearchService } from './services/categorySearchService';
import { ProductService } from './services/productService';
import { RelationService } from './services/relationService';
import { CookieService } from './services/cookieService';
import { CheckoutService } from './services/checkoutService';
import { SharedService } from './services/sharedService';

import { CategoryList } from './components/admin/categoryList';
import { CategoryDetail } from './components/admin/categoryDetail';
import { CategorySearch } from './components/admin/categorySearch';
import { ProductList } from './components/admin/productList';
import { ProductDetail } from './components/admin/productDetail';
import { OrderList } from './components/admin/orderList';

import { CategoryListPage } from './components/front/categoryListPage';
import { ProductListPage } from './components/front/productListPage';
import { ProductDetailPage } from './components/front/productDetailPage';
import { CartPage } from './components/front/cartPage';
import { CheckoutPage } from './components/front/checkoutPage';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        //InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule
    ],
    declarations: [
        Index,
        HeaderSection,
        AppComponent,

        //admin
        CategoryList,
        CategoryDetail,
        CategorySearch,
        ProductList,
        ProductDetail,
        OrderList,

        //front
        CategoryListPage,
        ProductListPage,
        ProductDetailPage,
        CartPage,
        CheckoutPage
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CategoryService,
        CategorySearchService,
        ProductService,
        RelationService,
        CookieService,
        CheckoutService,
        SharedService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }