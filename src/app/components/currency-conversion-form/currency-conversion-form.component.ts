import { Component, OnInit } from '@angular/core';
import { CurrencyExchangerService } from 'src/app/services/currency-exchanger.service';
import { CurrencyConversionDTO } from 'src/app/shared/models/currency-conversion-dto';

@Component({
  selector: 'app-currency-conversion-form',
  templateUrl: './currency-conversion-form.component.html',
  styleUrls: ['./currency-conversion-form.component.scss']
})
export class CurrencyConversionFormComponent implements OnInit {

  currencyConversionDTO: CurrencyConversionDTO;
  isLoading: boolean;
  currencyDDL: string[];

  constructor(private currencyExchangerService: CurrencyExchangerService) {
    this.currencyConversionDTO = new CurrencyConversionDTO();

    this.currencyConversionDTO.fromCurrency = "EUR";
    this.currencyConversionDTO.toCurrency = "USD";
    this.currencyConversionDTO.fromAmount = -1;

  }

  ngOnInit(): void {
    this.convert();
    this.getCurrencies();

  }

  convert() {
    this.isLoading = true;
    // get historical rates of the two selected currencies for today
    this.currencyExchangerService.getHistoricalRates(this.currencyConversionDTO).subscribe(
      res => {
        this.isLoading = false;
        if (res.success) {
          this.currencyConversionDTO.toAmount = Number((res.rates[this.currencyConversionDTO.toCurrency] * this.currencyConversionDTO.fromAmount).toFixed(5));
          console.log(this.currencyConversionDTO)
        } else {
          console.log(res.error.type);
        }
      });

  }

  getCurrencies() {
    this.currencyExchangerService.getCurrenciesSymbols().subscribe(res => {
      if (res.success) {
        this.currencyDDL = Object.keys(res.symbols);
        console.log(this.currencyDDL)
      }
    })
  }

}
