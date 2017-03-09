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

import { ProductSearchService } from './productSearchService';
import { Product } from './productModel';

@Component({
    moduleId: module.id,
    selector: '[product-search]',
    template: `
        <div id="search-component">
          <h4>Product Search</h4>
          <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
          <div>
            <div *ngFor="let product of products | async"
                 (click)="gotoDetail(product)" class="search-result" >
              {{product.name}}
            </div>
          </div>
        </div>
    `,
    providers: [ProductSearchService]
})
export class ProductSearch implements OnInit {
    products: Observable<Product[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private productSearchService: ProductSearchService,
        private router: Router) {}

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.products = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.productSearchService.search(term)
                // or the observable of empty heroes if there was no search term
                : Observable.of<Product[]>([]))

            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Product[]>([]);
            });
    }
    gotoDetail(product: Product): void {
        let link = ['admin/products/', product.id];
        this.router.navigate(link);
    }
}