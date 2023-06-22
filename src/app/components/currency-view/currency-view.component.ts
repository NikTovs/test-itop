import { Component, OnInit } from '@angular/core';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { CurrencyHelperService } from 'src/app/services/currency-helper.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-currency-view',
  templateUrl: './currency-view.component.html',
  styleUrls: ['./currency-view.component.scss']
})
export class CurrencyViewComponent implements OnInit {

  constructor(private http: HttpService, 
              public helper: CurrencyHelperService) {
  }
  
  ngOnInit(): void {
    this.getCurrenciesList();
  }

  completion$ = new Subject();

  currencyInput1 = '';
  currencyInput2 = '';

  selectedCurr1: string = '';
  selectedCurr2: string = '';

  getCurrenciesList(): void {
    this.http.getCurrencyList()
    .pipe(takeUntil(this.completion$))
    .subscribe(objectList => {
    let result = [];

    for (const key in objectList) {
      if (objectList.hasOwnProperty(key)) {
      result.push({ name: objectList[key], value: key });
     }
    }
      result = result.filter(currency => currency.name !== "");
      this.helper.setCurrencyList(result);
      this.selectedCurr1 = result[0].value;
      this.selectedCurr2 = result[1].value;
      this.getMultiplierList(this.selectedCurr1);

    });
  }

  getMultiplierList(currency: string): void {
    this.http.getCurrencyValue(currency)
    .pipe(takeUntil(this.completion$))
    .subscribe(resp => {
      this.helper.setMultiplierList(resp[currency]);
    });
  }

  calculateSecondValue(): void {
    this.currencyInput2 = 
    this.helper.calculateSecondValue(this.currencyInput1, this.selectedCurr2)
    .toFixed(2).toString();
  }

  calculateFirstVal(): void {
    this.currencyInput1 = 
    this.helper.calculateFirstValue(this.currencyInput2, this.selectedCurr2)
    .toFixed(2).toString();
  }

  firstSelectChanged(newVal: string): void {
    this.getMultiplierList(newVal);
    this.calculateSecondValue();
  }

  secondSelectChanged(): void {
    this.calculateSecondValue();
  }
}
