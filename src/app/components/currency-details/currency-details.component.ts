import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyExchangerService } from 'src/app/services/currency-exchanger.service';
import { popularCurrencySymbolEnum } from 'src/app/shared/enums/popular-currency-sumbol.enum';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();

  fromCurrency: string;
  fromCurrencyName: string;
  toCurrency: string;
  popularCurrencySymbolEnum: any;
  monthes: string[];
  historicalRates: number[];

  constructor(private activeRoute: ActivatedRoute, private currencyExchangerService: CurrencyExchangerService, private router: Router) {
    this.popularCurrencySymbolEnum = popularCurrencySymbolEnum;
    this.monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url) {
          this.fromCurrency = event.url.substring(20, 23);
          this.toCurrency = event.url.substring(24, 27);

          this.getHistoricalData();
          this.getCurrencyName()
        }
      }
    });
  }

  ngOnInit(): void {
    this.getHistoricalData();
    this.getCurrencyName()
  }

  getHistoricalData() {
    this.historicalRates = [];
    let startDate;
    for (let i = 1; i <= 12; i++) {
      startDate = '2021-' + (i < 10 ? ('0' + i) : i) + '-28';
      this.currencyExchangerService.getHistoricalRates(startDate, this.fromCurrency, this.toCurrency).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
        if (res.success) {
          this.historicalRates.push(res.rates[this.toCurrency]);
          console.log(this.historicalRates)
        }
      })
    }

  }

  getCurrencyName() {
    this.currencyExchangerService.getCurrenciesSymbols().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      if (res.success) {
        this.fromCurrencyName = res.symbols[this.fromCurrency];
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
