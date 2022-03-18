import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { CurrencyConversionFormComponent } from './components/currency-conversion-form/currency-conversion-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { PositiveNumberDirective } from './shared/directives/positive-number.directive';
import { TooltipsModule } from '@progress/kendo-angular-tooltip';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CurrencyConversionFormComponent,
    PositiveNumberDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DropDownsModule,
    FormsModule,
    TooltipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
