import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { CategoryList } from './admin/category/categoryList';
import { CategoryDetail } from './admin/category/categoryDetail';
import { CategoryService } from './admin/category/categoryService';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        CategoryList,
        CategoryDetail,
        AppComponent
    ],
    providers: [
        CategoryService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }