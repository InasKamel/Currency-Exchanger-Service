import { Component, OnInit } from '@angular/core';
import { CurrencyExchangerService } from 'src/app/services/currency-exchanger.service';
import { CurrencyColorEnum } from 'src/app/shared/enums/currency-color.enum';
import { PopularCurrencyNameEnum } from 'src/app/shared/enums/popular-currency-name.enum';
import { popularCurrencySymbolEnum } from 'src/app/shared/enums/popular-currency-sumbol.enum';
import { CurrencyConversionDTO } from 'src/app/shared/models/currency-conversion-dto';
import { PopularCurrencyDTO } from 'src/app/shared/models/popular-currency-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularCurrenciesLoading: boolean;
  baseAmount: number;
  popularCurrencies: PopularCurrencyDTO[];

  constructor(private currencyExchangerService: CurrencyExchangerService) { }

  ngOnInit(): void {
    console.log(CurrencyColorEnum[1])
    console.log(`latest?access_key=477f73b9db08241187d368ca73838cb8&base=USD&symbols=${(Object.keys(popularCurrencySymbolEnum).filter(k => k.length == 3)).join()}`)
  }

  baseAmountChange(currencyConversionDTO: CurrencyConversionDTO) {
    this.popularCurrenciesLoading = true;
    this.baseAmount = currencyConversionDTO.fromAmount;
    this.currencyExchangerService.getLatestRates(currencyConversionDTO.fromCurrency).subscribe(res => {
      this.popularCurrenciesLoading = false;
      this.preparePopularCurrenciesData(res.rates)

      if (res.success) {
        // this.preparePopularCurrenciesData(res.rates)
      }
    })

  }


  preparePopularCurrenciesData(rates: any) {
    this.popularCurrencies = [];
    let currency: PopularCurrencyDTO;


    for (let i = 1; i <= 9; i++) {
      currency = new PopularCurrencyDTO();
      currency["id"] = i;
      currency["symbol"] = popularCurrencySymbolEnum[i];
      currency["resultAmount"] = rates ? (rates[currency["symbol"]] * this.baseAmount) : 0;
      currency["name"] = PopularCurrencyNameEnum[i];
      currency["color"] = CurrencyColorEnum[i];
      this.popularCurrencies.push(Object.assign({}, currency));
    }

  }



}
