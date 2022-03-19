import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyDetailsComponent } from './components/currency-details/currency-details.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: "currency-exchanger",
    component: HomeComponent
  },
  {
    path: "currency-exchanger/:from/:to",
    component: CurrencyDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
