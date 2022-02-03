import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transaction} from "../model/transaction";
import {Reclamation_assurance} from "../model/reclamation_assurance";


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.host}/transaction/retrieve-all-Transacation`);
  }

  public addTransaction(tran : Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.host}/transaction/add-Transaction`,tran);
  }

  public updateTransaction(tran : Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.host}/transaction/modify-Transaction`,tran);
  }

  public deleteTransaction(id_t : number): Observable<void> {
    return this.http.delete<void>(`${this.host}/transaction/remove-Transaction/${id_t}`);
  }

  public addAML(t : Transaction[]): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(`${this.host}/prediction/template/aml_p`,t);
  }
}
