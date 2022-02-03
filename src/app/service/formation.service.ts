import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../model/formation";
import {Statistic} from "../model/statistic";


@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}


  public getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.host}/formation/retrieve-all-Formations`);
  }

  public addFormation(form : Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.host}/formation/add-Formation`,form);
  }

  public updateFormation(form : Formation): Observable<Formation> {
    return this.http.put<Formation>(`${this.host}/formation/modify-Formation`,form);
  }

  public deleteFormation(id_ : number): Observable<void> {
    return this.http.delete<void>(`${this.host}/formation/remove-Formation/${id_}`);
  }

  public getStatistic(): Observable<Statistic> {
    return this.http.get<Statistic>(`${this.host}/statsticformation/statistic`);
  }

}
