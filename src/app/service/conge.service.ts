import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conges} from "../model/conges";


@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}


  public getConges(): Observable<Conges[]> {
    return this.http.get<Conges[]>(`${this.host}/conges/retrieve-all-conges`);
  }

  public addConge(conge : Conges): Observable<Conges> {
    return this.http.post<Conges>(`${this.host}/conges/add-Conges`,conge);
  }

  public updateConge(conge : Conges): Observable<Conges> {
    return this.http.put<Conges>(`${this.host}/conges/modify-Conges`,conge);
  }

  public deleteConge(id_c : number): Observable<void> {
    return this.http.delete<void>(`${this.host}/conges/remove-Conges/${id_c}`);
  }

  public getCongeById(id_c: number): Observable<Conges> {
    return this.http.get<Conges>(`${this.host}/conges/retrieve-Conges/${id_c}`);
  }
}
