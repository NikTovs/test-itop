import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  eurToUahCurrent = 0;
  usdToUahCurrent = 0;
  completion$ = new Subject();

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
    this.getValue();
    
  }

  getValue() {
    this.http.getCurrencyValue('usd')
    .pipe(takeUntil(this.completion$))
    .subscribe(respArray => {
      this.usdToUahCurrent = respArray.usd.uah.toFixed(2);
    });

    this.http.getCurrencyValue('eur')
    .pipe(takeUntil(this.completion$))
    .subscribe(respArray => {
      this.eurToUahCurrent = respArray.eur.uah.toFixed(2);
    });
  }

  ngOnDestroy(): void {
    this.completion$.next(null);
    this.completion$.complete();
  }
}
