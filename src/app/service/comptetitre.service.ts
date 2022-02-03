import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Compte_titre} from "../model/compte_titre";


@Injectable({
  providedIn: 'root'
})
export class ComptetitreService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}


  public getComptetitres(): Observable<Compte_titre[]> {
    return this.http.get<Compte_titre[]>(`${this.host}/comptetitre/retrieve-all-Compte_titre`);
  }

  public addComptetitre(ct : Compte_titre): Observable<Compte_titre> {
    return this.http.post<Compte_titre>(`${this.host}/comptetitre/add-Compte_titre`,ct);
  }

  public updateComptetitre(ct : Compte_titre): Observable<Compte_titre> {
    return this.http.put<Compte_titre>(`${this.host}/comptetitre/modify-Compte_titre`,ct);
  }

  public deleteComptetitre(id_comp : number): Observable<void> {
    return this.http.delete<void>(`${this.host}/comptetitre/remove-Compte_titre/${id_comp}`);
  }

  public getComptetitreById(id_comp: number): Observable<Compte_titre> {
    return this.http.get<Compte_titre>(`${this.host}/comptetitre/retrieve-Compte_titre/${id_comp}`);
  }
}
