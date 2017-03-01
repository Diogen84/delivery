import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { CategoryList } from './admin/category/categoryList';
import { CategoryDetail } from './admin/category/categoryDetail';
import { CategoryService } from './admin/category/categoryService';

import { AppRoutingModule }     from './app.router';


// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './simulated-api/in-memory-data.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
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