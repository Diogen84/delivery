import { InMemoryDbService } from 'angular2-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let categories = [
            {
                id: 1,
                name: 'category1',
                thumbnail: 'category_thumbnail_1',
                shortDescription : 'category 1 short description',
                description : 'Lorem ipsum dolor sit amet lorem ispum dolor sit amet',
                lock : true,
                created : '11dec2017',
                edited : '11dec2017'
            },
            {
                id: 2,
                name: 'category2',
                thumbnail: 'category_thumbnail_2',
                shortDescription : 'category 2 short description',
                description : 'Lorem ipsum dolor sit amet lorem ispum dolor sit amet',
                lock : false,
                created : '12dec2017',
                edited : '12dec2017'
            },
            {
                id: 3,
                name: 'category3',
                thumbnail: 'category_thumbnail_3',
                shortDescription : 'category 3 short description',
                description : 'Lorem ipsum dolor sit amet lorem ispum dolor sit amet',
                lock : false,
                created : '23dec2017',
                edited : '23dec2017'
            }
        ];
        let products = [
            {
                id: 1,
                name: 'Product1',
                thumbnail: 'product_thumbnail1',
                inStock : 10,
                price: '100.00',
                currency : '$',
                weight: '10kg',
                shortDescription : 'Product 1 Lorem ipsum dolor sit amet lorem ispum dolor sit amet',
                description : 'Product1 Lorem ipsum dolor sit amet lorem ispum dolor sit amet',
                lock : true,
                created : '23dec2017',
                edited : '23dec2017'
            },
            {
                id: 2,
                name: 'Product2',
                thumbnail: 'product_thumbnail2',
                inStock : 20,
                price: '120.00',
                currency : '$',
                weight: '20kg',
                shortDescription : 'Product 2 Lorem ipsum dolor sit amet lorem ispum dolor sit amet',
                description : 'Product2 Lorem ipsum dolor sit amet lorem ispum dolor sit amet',
                lock : false,
                created : '23dec2017',
                edited : '23dec2017'
            },
            {
                id: 3,
                name: 'Product3',
                thumbnail: 'product_thumbnail3',
                inStock : 30,
                price: '300.00',
                currency : '$',
                weight: '30kg',
                shortDescription : 'Product 3 Lorem ipsum dolor sit amet lorem ispum dolor sit amet',
                description : 'Product3 Lorem ipsum dolor sit amet lorem ispum dolor sit amet',
                lock : false,
                created : '23dec2017',
                edited : '23dec2017'
            }
        ];
        let relation = [
            {
                id:1,
                productId:1,
                categoryId:1
            },
            {
                id:2,
                productId:2,
                categoryId:1
            },
            {
                id:3,
                productId:2,
                categoryId:2
            },
            {
                id:4,
                productId:3,
                categoryId:2
            },
            {
                id:5,
                productId:1,
                categoryId:3
            },
            {
                id:6,
                productId:3,
                categoryId:3
            }
        ];
        return {categories, products, relation};
    }
}