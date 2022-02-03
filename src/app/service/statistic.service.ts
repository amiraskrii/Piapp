import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Salaire} from "../model/salaire";
import {Statistic} from "../model/statistic";
import {Statisticsalaire} from "../model/statisticsalaire";
import {Statisticuser} from "../model/statisticuser";
import {Statisticcountmsg} from "../model/statisticcountmsg";
import {Statistictempsmsg} from "../model/statistictempsmsg";
import {Statmesrep} from "../model/statmesrep";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getcountAgent(): Observable<Statisticuser> {
    return this.http.get<Statisticuser>(`${this.host}/statsticformation/countuser`);
  }

  public getsumsalaire(): Observable<Statisticsalaire> {
    return this.http.get<Statisticsalaire>(`${this.host}/statsticformation/countsalaire`);
  }

  public getmessagecount(): Observable<Statisticcountmsg> {
    return this.http.get<Statisticcountmsg>(`${this.host}/statsticformation/countmsg`);
  }

  public getsumTempsmesg(): Observable<Statistictempsmsg> {
    return this.http.get<Statistictempsmsg>(`${this.host}/statsticformation/countmsgtemps`);
  }

  public getsumTempsmesgRep(): Observable<Statmesrep> {
    return this.http.get<Statmesrep>(`${this.host}/statsticformation/countmsgtempsrep`);
  }
}
