import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

type NewType = Subject<void>;

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit,OnDestroy {
  unsubscribe: NewType = new Subject<void>();

  activeRoute: string;
  detailsURLEnum: any;
  EURUSDActivated: boolean;
  EURGBPActivated: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((event) => {
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

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
