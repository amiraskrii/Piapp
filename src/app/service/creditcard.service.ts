import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Credit_card} from "../model/credit_card";


@Injectable({
  providedIn: 'root'
})
export class CreditcardService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}


  public getCreditcards(): Observable<Credit_card[]> {
    return this.http.get<Credit_card[]>(`${this.host}/credit_card/retrieve-all-Credit_card`);
  }

  public addCreditcard(cc : Credit_card): Observable<Credit_card> {
    return this.http.post<Credit_card>(`${this.host}/credit_card/add-Credit_card`,cc);
  }

  public updateCreditcard(cc : Credit_card): Observable<Credit_card> {
    return this.http.put<Credit_card>(`${this.host}/credit_card/modify-Credit_card`,cc);
  }

  public deleteCreditcard(referance : number): Observable<void> {
    return this.http.delete<void>(`${this.host}/credit_card/remove-Credit_card/${referance}`);
  }

  public getCreditcardById(referance: number): Observable<Credit_card> {
    return this.http.get<Credit_card>(`${this.host}/credit_card/retrieve-Credit_card/${referance}`);
  }
}
