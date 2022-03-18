import { CurrencyColorEnum } from "../enums/currency-color.enum";
import { PopularCurrencyNameEnum } from "../enums/popular-currency-name.enum";
import { popularCurrencySymbolEnum } from "../enums/popular-currency-sumbol.enum";

export class PopularCurrencyDTO {
    id: popularCurrencySymbolEnum;
    symbol: string;
    resultAmount: number;
    name: string;
    color: string
}