export class CurrencyConversionDTO {
    constructor() {
        this.fromAmount = 1;
    }

    fromAmount: number;
    fromCurrency: string;
    toCurrency: string;

    // only for frontend binding
    toAmount: number;

}