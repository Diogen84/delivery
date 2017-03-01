import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { CategoryList } from './admin/category/categoryList';
import { CategoryDetail } from './admin/category/categoryDetail';
import { CategoryService } from './admin/category/categoryService';

import { AppRoutingModule }     from './app.router';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        CategoryList,
        CategoryDetail
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CategoryService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }