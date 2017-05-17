import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    ngOnInit(): void {
        /*this.getCategories();*/
        console.log('index page');
    }
}