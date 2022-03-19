import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
export class HomeComponent implements OnInit, OnDestroy {

  popularCurrenciesLoading: boolean;
  baseAmount: number;
  popularCurrencies: PopularCurrencyDTO[];
  popularCurrencySymbolEnum: any;
  unsubscribe: Subject<void> = new Subject<void>();


  constructor(private currencyExchangerService: CurrencyExchangerService) {
    this.popularCurrencySymbolEnum = popularCurrencySymbolEnum;
  }

  ngOnInit(): void {
  }

  baseAmountChange(currencyConversionDTO: CurrencyConversionDTO) {
    this.popularCurrenciesLoading = true;
    this.baseAmount = currencyConversionDTO.fromAmount;
    this.currencyExchangerService.getLatestRates(currencyConversionDTO.fromCurrency).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
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

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }




}
