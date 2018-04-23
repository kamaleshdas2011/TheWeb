import { Product } from "./product";
import { Payment } from "./Payment";

export class Order{
    AddressID: string;
    Product: Product[];
    PaymentDetails: Payment;
}