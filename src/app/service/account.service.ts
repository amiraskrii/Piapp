import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../model/account";


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.host}/account/retrieve-all-Account`);
  }

  public addAccount(account : Account): Observable<Account> {
    return this.http.post<Account>(`${this.host}/account/add-Account`,account);
  }

  public updateAccount(account : Account): Observable<Account> {
    return this.http.put<Account>(`${this.host}/account/modify-Account`,account);
  }

  public deleteAccount(referance : number): Observable<void> {
    return this.http.delete<void>(`${this.host}/account/remove-Account/${referance}`);
  }

  public getAccountById(referance: number): Observable<Account> {
    return this.http.get<Account>(`${this.host}/account/retrieve-Account/${referance}`);
  }
}
