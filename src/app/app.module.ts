import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { CategoryList } from './admin/categoryList';
import { CategoryDetail } from './admin/categoryDetail';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        CategoryList,
        CategoryDetail
    ],
    bootstrap: [ CategoryList ]
})
export class AppModule { }