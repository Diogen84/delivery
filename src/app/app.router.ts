import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryList } from './admin/category/categoryList';
import { CategoryDetail } from './admin/category/categoryDetail';

import { ProductList } from './admin/product/productList';

const routes: Routes = [
    { path: '', redirectTo: 'admin/categories', pathMatch: 'full' },
    { path: 'admin/categories', component: CategoryList },
    { path: 'admin/categories/:id', component: CategoryDetail }
    { path: 'admin/products', component: ProductList }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}