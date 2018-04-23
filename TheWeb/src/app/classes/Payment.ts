export class Payment {
    Method: string;
    CardNumber: number;
    BankName: string;
}
enum PaymentMethod {
    COD,
    CreditCard,
    DebitCard,
    NetBanking
}