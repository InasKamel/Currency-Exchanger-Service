import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyExchangerService } from 'src/app/services/currency-exchanger.service';
import { popularCurrencySymbolEnum } from 'src/app/shared/enums/popular-currency-sumbol.enum';
import { CurrencyConversionDTO } from 'src/app/shared/models/currency-conversion-dto';

@Component({
  selector: 'app-currency-conversion-form',
  templateUrl: './currency-conversion-form.component.html',
  styleUrls: ['./currency-conversion-form.component.scss']
})
export class CurrencyConversionFormComponent implements OnInit, OnDestroy {

  @Input() fromCurrency: popularCurrencySymbolEnum;
  @Input() toCurrency: popularCurrencySymbolEnum;
  @Input() currencyReadOnly: boolean;
  @Output() baseAmountChange: EventEmitter<CurrencyConversionDTO> = new EventEmitter<CurrencyConversionDTO>();

  unsubscribe: Subject<void> = new Subject<void>();

  currencyConversionDTO: CurrencyConversionDTO;
  isLoading: boolean;
  currencyDDL: string[];
  baseCurrencyAccessRestricted: boolean;

  constructor(private currencyExchangerService: CurrencyExchangerService, private router: Router) {
    this.currencyConversionDTO = new CurrencyConversionDTO();
  }

  ngOnInit(): void {
    this.currencyConversionDTO.fromCurrency = popularCurrencySymbolEnum[this.fromCurrency];
    this.currencyConversionDTO.toCurrency = popularCurrencySymbolEnum[this.toCurrency];
    this.convert();
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
    this.currencyExchangerService.convert(this.currencyConversionDTO).pipe(takeUntil(this.unsubscribe)).subscribe(
      res => {
        this.isLoading = false;
        if (res.success) {
          this.currencyConversionDTO.toAmount = res.result.toFixed(5);
          this.baseCurrencyAccessRestricted = false;
        } else {
          this.baseCurrencyAccessRestricted = true;
        }
      });

  }

  getCurrencies() {
    this.currencyExchangerService.getCurrenciesSymbols().pipe(takeUntil(this.unsubscribe)).subscribe(res => {

      if (res.success) {
        this.currencyDDL = Object.keys(res.symbols);
      }
    })
  }

  viewDetailsPage() {
    this.router.navigate([`/currency-exchanger/${this.currencyConversionDTO.fromCurrency}/${this.currencyConversionDTO.toCurrency}`])
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
