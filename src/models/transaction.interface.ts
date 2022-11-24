export interface Transaction {
    id?: number;
    debitedAccount?: number;
    creditedAccount: any;
    value: number;
}