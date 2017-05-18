import { OrderModel } from './orderModel';

export class CheckoutOrderModel {
    id: number;
    date: any;
    name: string;
    phone: string;
    address: string;
    additional: any;
    totalPrice: number;
    status:string;
    products: OrderModel[];
}