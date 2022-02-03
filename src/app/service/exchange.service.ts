import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../model/formation";
import {Exchange, Rate} from "../model/exchange";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  public host = 'http://api.nbp.pl/api/exchangerates/tables/a/last/5/?format=json';

  constructor(private http: HttpClient) { }

  getExchanges() {
    return this.http.get<Exchange[]>(this.host);
  }
  getRates() {
    return this.http.get<Rate[]>(this.host);
  }
}
