import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  activeRoute: string;
  detailsURLEnum: any;
  EURUSDActivated: boolean;
  EURGBPActivated: boolean;
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url) {
          if (event.url.includes('/EUR/')) {
            if (event.url.includes('/USD')) {
              this.EURUSDActivated = true;
              this.EURGBPActivated = false;
            } else {
              this.EURGBPActivated = true;
              this.EURUSDActivated = false;

            }
          } else {
            this.EURGBPActivated = false;
            this.EURUSDActivated = false;
          }

        }
      }
    });

  }

  viewDetailsPage() {
    if(this.EURGBPActivated) {
      this.EURUSDActivated = true;
      this.EURGBPActivated=false;
    } else {
      this.EURUSDActivated = false;
      this.EURGBPActivated=true;
    }
    let url = this.EURGBPActivated ? '/currency-exchanger/EUR/GBP' : '/currency-exchanger/EUR/USD';
    this.router.navigate([url]);
  }

}
