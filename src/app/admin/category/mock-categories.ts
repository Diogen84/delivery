import { Category } from './categoryModel';

export const CATEGORIES: Category[] = [
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