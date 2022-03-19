import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { popularCurrencySymbolEnum } from '../shared/enums/popular-currency-sumbol.enum';
import { CurrencyConversionDTO } from '../shared/models/currency-conversion-dto';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangerService {

  baseURL: string;
  accessKey: string;
  constructor(private http: HttpClient) {
    this.baseURL = 'http://data.fixer.io/api/';
    this.accessKey = '?access_key=477f73b9db08241187d368ca73838cb8';
    // this.baseURL = 'ddddd';
    // this.accessKey = 'ddddd';
  }

  convert(data: CurrencyConversionDTO) {
    return this.http.get(`${this.baseURL}convert${this.accessKey}&from=${data.fromCurrency}&to=${data.toCurrency}&amount=${data.fromAmount}`) as Observable<any>

  }
  getHistoricalRates(startDate: string, fromCurrency: string, toCurrency: string): Observable<any> {
    return this.http.get(`${this.baseURL}${startDate}${this.accessKey}&base=${fromCurrency}&symbols=${toCurrency}`) as Observable<any>
  }

  getCurrenciesSymbols() {
    return this.http.get(`${this.baseURL}symbols${this.accessKey}`) as Observable<any>

  }

  getLatestRates(baseCurrency: string): Observable<any> {
    return this.http.get(`${this.baseURL}latest${this.accessKey}&base=${baseCurrency}&symbols=${(Object.keys(popularCurrencySymbolEnum).filter(k => k.length == 3)).join()}`) as Observable<any>

  }
}
