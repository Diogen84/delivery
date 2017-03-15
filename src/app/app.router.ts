import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Index } from './front/index/index';
import { Categories } from './front/categories/categories';
import { Products } from './front/products/products';
import { ProductPage } from './front/products/product';

import { CategoryList } from './admin/category/categoryList';
import { CategoryDetail } from './admin/category/categoryDetail';

import { ProductList } from './admin/product/productList';
import { ProductDetail } from './admin/product/productDetail';

const routes: Routes = [
    //front
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: Index },

    //shop
    { path: 'categories', component: Categories },
    { path: 'categories/:id', component: Products },
    { path: 'products/:id', component: ProductPage },
    { path: 'cart', component: Index },
    { path: 'checkout', component: Index }, //???

    //admin
    { path: 'admin/categories', component: CategoryList },
    { path: 'admin/categories/:id', component: CategoryDetail },
    { path: 'admin/products', component: ProductList },
    { path: 'admin/products/:id', component: ProductDetail }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}