import { Injectable } from '@angular/core';

import { Category } from './categoryModel';
import { CATEGORIES } from './mock-categories';

@Injectable()
export class CategoryService {
    getCategories(): Promise<Category[]> {
        return Promise.resolve(CATEGORIES);
    }

    // See the "Take it slow" appendix
    getCategoriesSlowly(): Promise<Category[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getCategories()), 2000);
        });
    }

    getCategory(id: number): Promise<Category> {
        return this.getCategories()
            .then(categories => categories.find(category => category.id === id));
    }
}