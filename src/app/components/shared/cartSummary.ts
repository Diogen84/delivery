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

import {SharedService} from '../../services/sharedService';

@Component({
    moduleId:module.id,
    selector:'[cart-summary]',
    template:`
    
    `,
    providers:[SharedService]
})

export class CartSummary implements OnInit {
    private cartSummary:Observable<number>;


}