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
import { Products } from './front/products/products';
import { ProductPage } from './front/products/productPage';
import { AppComponent } from './app.component';

import { RelationService } from './shared/relationService';

import { CategoryList } from './admin/category/categoryList';
import { CategoryDetail } from './admin/category/categoryDetail';
import { CategorySearch } from './admin/category/categorySearch';
import { CategoryService } from './admin/category/categoryService';

import { ProductList } from './admin/product/productList';
import { ProductDetail } from './admin/product/productDetail';
import { ProductSearch } from './admin/product/productSearch';
import { ProductService } from './admin/product/productService';
import { OrderList } from './admin/orders/orderList';

import { CartPage } from './front/cart/cartPage';
import { CheckoutPage } from './front/cart/checkoutPage';
import { CheckoutService } from './front/cart/checkoutService';

import { CookieService } from './shared/cookieService';

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
        HeaderSection,
        Categories,
        Products,
        ProductPage,
        AppComponent,

        ProductList,
        ProductDetail,
        ProductSearch,

        CategorySearch,
        CategoryList,
        CategoryDetail,
        OrderList,

        CartPage,
        CheckoutPage
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CategoryService,
        ProductService,
        RelationService,
        CheckoutService,
        CookieService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }