import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {env} from 'environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getCurrencyValue(currency: string): Observable<any> {
    return this.http.get(env.baseApi + `currencies/` + `${currency}.json`);
  }

  getCurrencyList(): Observable<any> {
    return this.http.get(env.baseApi + 'currencies.json');
  }
}
