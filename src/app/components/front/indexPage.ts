import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../../services/sharedService';

@Component({
    moduleId: module.id,
    selector: 'div.index',
    template:`
        <div class="holder">
            <div class="gallery">
                <img src="images/gallery1.png" alt="" />
            </div>
            <div class="reference">
                <div class="holder">
                </div>
            </div>
        </div>
    `
})

export class Index {
    constructor(
        private sharedService: SharedService
    ) {}

    ngOnInit(): void {
        this.sharedService.publishCart();
    }
}