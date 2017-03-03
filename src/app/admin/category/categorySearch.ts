import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { CategorySearchService } from './categorySearchService';
import { Category } from './categoryModel';

@Component({
    moduleId: module.id,
    selector: '[category-search]',
    template: `
        <div id="search-component">
          <h4>Category Search</h4>
          <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
          <div>
            <div *ngFor="let category of categories | async"
                 (click)="gotoDetail(category)" class="search-result" >
              {{category.name}}
            </div>
          </div>
        </div>
    `,
    providers: [CategorySearchService]
})
export class CategorySearch implements OnInit {
    categories: Observable<Category[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private categorySearchService: CategorySearchService,
        private router: Router) {}

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.categories = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.categorySearchService.search(term)
                // or the observable of empty heroes if there was no search term
                : Observable.of<Category[]>([]))

            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Category[]>([]);
            });
    }
    gotoDetail(category: Category): void {
        let link = ['admin/categories/', category.id];
        this.router.navigate(link);
    }
}