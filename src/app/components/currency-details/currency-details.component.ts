import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { popularCurrencySymbolEnum } from 'src/app/shared/enums/popular-currency-sumbol.enum';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit {

  fromCurrency: string;
  toCurrency: string;
  popularCurrencySymbolEnum:any;

  constructor(private activeRoute: ActivatedRoute) {
    this.fromCurrency = String(this.activeRoute.snapshot.paramMap.get('from'));
    this.toCurrency = String(this.activeRoute.snapshot.paramMap.get('to'));
    this.popularCurrencySymbolEnum = popularCurrencySymbolEnum;
  }

  ngOnInit(): void {
  }

}
