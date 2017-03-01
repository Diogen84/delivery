import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryList } from './admin/category/categoryList';
import { CategoryDetail } from './admin/category/categoryDetail';

const routes: Routes = [
    { path: '', redirectTo: 'admin/categories', pathMatch: 'full' },
    { path: 'admin/categories', component: CategoryList },
    { path: 'admin/categories/:id', component: CategoryDetail }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}