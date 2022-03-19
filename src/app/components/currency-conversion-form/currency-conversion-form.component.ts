import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyExchangerService } from 'src/app/services/currency-exchanger.service';
import { popularCurrencySymbolEnum } from 'src/app/shared/enums/popular-currency-sumbol.enum';
import { CurrencyConversionDTO } from 'src/app/shared/models/currency-conversion-dto';

@Component({
  selector: 'app-currency-conversion-form',
  templateUrl: './currency-conversion-form.component.html',
  styleUrls: ['./currency-conversion-form.component.scss']
})
export class CurrencyConversionFormComponent implements OnInit {

  @Input() fromCurrency: popularCurrencySymbolEnum;
  @Input() toCurrency: popularCurrencySymbolEnum;
  @Input() currencyReadOnly: boolean;
  @Output() baseAmountChange: EventEmitter<CurrencyConversionDTO> = new EventEmitter<CurrencyConversionDTO>();

  currencyConversionDTO: CurrencyConversionDTO;
  isLoading: boolean;
  currencyDDL: string[];
  baseCurrencyAccessRestricted: boolean;

  constructor(private currencyExchangerService: CurrencyExchangerService, private router: Router) {


  }

  ngOnInit(): void {
    this.currencyConversionDTO = new CurrencyConversionDTO();
    this.currencyConversionDTO.fromAmount = 10.00;
    this.currencyConversionDTO.fromCurrency = popularCurrencySymbolEnum[this.fromCurrency];
    this.currencyConversionDTO.toAmount = 157.22732;
    this.currencyConversionDTO.toCurrency = popularCurrencySymbolEnum[this.toCurrency];
    // this.convert();
    this.fromAmountChange();
    this.getCurrencies();

  }

  fromAmountChange() {
    this.baseAmountChange.emit(this.currencyConversionDTO);
    this.convert();
  }

  convert() {
    this.isLoading = true;
    // get historical rates of the two selected currencies for today
    this.currencyExchangerService.getHistoricalRates(this.currencyConversionDTO).subscribe(
      res => {
        this.isLoading = false;
        console.log("convert", res)

        if (res.success) {
          this.currencyConversionDTO.toAmount = Number((res.rates[this.currencyConversionDTO.toCurrency] * this.currencyConversionDTO.fromAmount).toFixed(5));
          this.baseCurrencyAccessRestricted = false;
        } else {
          this.baseCurrencyAccessRestricted = true;
        }
      });

  }

  getCurrencies() {
    this.currencyExchangerService.getCurrenciesSymbols().subscribe(res => {
      console.log("get currency", res)

      if (res.success) {
        this.currencyDDL = Object.keys(res.symbols);
      }
    })
  }

  viewDetailsPage() {
    this.router.navigate([`/currency-exchanger/${this.currencyConversionDTO.fromCurrency}/${this.currencyConversionDTO.toCurrency}`])
  }

}
