import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reclamation_assurance} from "../model/reclamation_assurance";


@Injectable({
  providedIn: 'root'
})
export class ReclamationassuranceService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}


  public getReclamationassurances(): Observable<Reclamation_assurance[]> {
    return this.http.get<Reclamation_assurance[]>(`${this.host}/reclamationassurance/retrieve-all-ReclamationAssurance`);
  }

  public addReclamationassurance(ra : Reclamation_assurance): Observable<Reclamation_assurance> {
    return this.http.post<Reclamation_assurance>(`${this.host}/reclamationassurance/add-Reclamation_assurance`,ra);
  }

  public updateReclamationassurance(ra : Reclamation_assurance): Observable<Reclamation_assurance> {
    return this.http.put<Reclamation_assurance>(`${this.host}/reclamationassurance/modify-Reclamation_assurance`,ra);
  }

  public deleteReclamationassurance(id_r : number): Observable<void> {
    return this.http.delete<void>(`${this.host}/reclamationassurance/remove-Reclamation_assurance/${id_r}`);
  }

  public addAssurance(ra : Reclamation_assurance[]): Observable<Reclamation_assurance[]> {
    return this.http.post<Reclamation_assurance[]>(`${this.host}/prediction/template/assurance_p`,ra);
  }
}
