import { ProductModel } from './productModel';

export class OrderHistory {
    id: number;
    date: any;
    name: string;
    phone: string;
    address: string;
    additional: any;
    totalPrice: number;
    status:string;
    products: ProductModel[];
}