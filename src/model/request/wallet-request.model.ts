export interface WalletRequestModel {
    name: string;
    walletType: number;
    balance: number;
    userId: number;
}

export interface WalletResponseModel {
    id: number;
    name: string;
    walletType: number;
    balance: unknown;
}