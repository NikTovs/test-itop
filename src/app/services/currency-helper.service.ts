import { Injectable } from '@angular/core';
import { CurrencyData, CurrencyType } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class CurrencyHelperService {

  constructor() { }

  currencyList: CurrencyType[] = [];
  multiplierList: CurrencyData = {};

  setCurrencyList(list: CurrencyType[]): void {
    this.currencyList = list;
  }

  setMultiplierList(multiplier: CurrencyData): void {
    this.multiplierList = multiplier;
  }

  getMultiplier(currency: string): number {
    return this.multiplierList[currency];
  }

  getCurrencyList(): CurrencyType[] {
    return this.currencyList;
  }

  calculateSecondValue(firstValue: number | string, selectedSecondCurr: string): number {
    return Number(firstValue) * this.multiplierList[selectedSecondCurr];
  }

  calculateFirstValue(firstValue: number | string, selectedSecondCurr: string): number {
    return Number(firstValue) / this.multiplierList[selectedSecondCurr];
  }
}
