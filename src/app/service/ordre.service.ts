import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ordre} from "../model/ordre";


@Injectable({
  providedIn: 'root'
})
export class OrdreService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}


  public getOrdres(): Observable<Ordre[]> {
    return this.http.get<Ordre[]>(`${this.host}/ordre/retrieve-all-Order`);
  }

  public addOrdre(ordre : Ordre): Observable<Ordre> {
    return this.http.post<Ordre>(`${this.host}/ordre/add-Order`,ordre);
  }

  public updateOrdre(ordre : Ordre): Observable<Ordre> {
    return this.http.put<Ordre>(`${this.host}/ordre/modify-Order`,ordre);
  }

  public deleteOrdre(id_o : number): Observable<void> {
    return this.http.delete<void>(`${this.host}/ordre/remove-Order/${id_o}`);
  }

  public getOrdreById(id_o: number): Observable<Ordre> {
    return this.http.get<Ordre>(`${this.host}/ordre/retrieve-Order/${id_o}`);
  }
}
