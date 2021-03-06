export class CartModel {
    product : {
        id: number;
        name: string;
        thumbnail: any;
        inStock : number;
        price: string;
        currency : string;
        weight: string;
        shortDescription : string;
        description : string;
        lockField : boolean;
        created : string;
        edited : string;
    };
    amount : number;
    totalPrice: number;
}