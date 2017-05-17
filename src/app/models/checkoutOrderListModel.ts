export class CheckoutOrderListProductModel {
    id: number;
    name: string;
    thumbnail: any;
    inStock : number;
    price: string;
    currency : string;
    weight: string;
    shortDescription : string;
    description : string;
    lock : boolean;
    created : string;
    edited : string;
}

export class CheckoutOrderListModel {
    date: any;
    name: string;
    phone: string;
    address: string;
    additional: any;
    totalPrice: number;
    products: CheckoutOrderListProductModel[];
}