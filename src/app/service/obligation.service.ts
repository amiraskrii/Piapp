import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Obligation} from "../model/obligation";


@Injectable({
  providedIn: 'root'
})
export class ObligationService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}


  public getObligations(): Observable<Obligation[]> {
    return this.http.get<Obligation[]>(`${this.host}/obligation/retrieve-all-Obligation`);
  }

  public addObligation(ob : Obligation): Observable<Obligation> {
    return this.http.post<Obligation>(`${this.host}/obligation/add-Obligation`,ob);
  }

  public updateObligation(ob : Obligation): Observable<Obligation> {
    return this.http.put<Obligation>(`${this.host}/obligation/modify-Obligation`,ob);
  }

  public deleteObligation(id_ob : number): Observable<void> {
    return this.http.delete<void>(`${this.host}/obligation/remove-Obligation/${id_ob}`);
  }

  public getObligationById(id_ob: number): Observable<Obligation> {
    return this.http.get<Obligation>(`${this.host}/obligation/retrieve-Obligation/${id_ob}`);
  }
}
