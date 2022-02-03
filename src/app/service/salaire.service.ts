import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../model/account";
import {Salaire} from "../model/salaire";

@Injectable({
  providedIn: 'root'
})
export class SalaireService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getSalaires(): Observable<Salaire[]> {
    return this.http.get<Salaire[]>(`${this.host}/salaire/retrieve-all-salaire`);
  }

  public addSalaire(sal : Salaire): Observable<Salaire> {
    return this.http.post<Salaire>(`${this.host}/salaire/add-Salaire`,sal);
  }

  public updateSalaire(sal : Salaire): Observable<Salaire> {
    return this.http.put<Salaire>(`${this.host}/salaire/modify-Salaire`,sal);
  }

  public deleteSalaire(id_s : number): Observable<void> {
    return this.http.delete<void>(`${this.host}/salaire/remove-Salaire/${id_s}`);
  }

  public getSalaireById(id_s: number): Observable<Salaire> {
    return this.http.get<Salaire>(`${this.host}/salaire/retrieve-Salaire/${id_s}`);
  }
}
