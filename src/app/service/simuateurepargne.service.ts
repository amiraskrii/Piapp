import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Simulateurcredit} from "../model/simulateurcredit";
import {Observable} from "rxjs";
import {Simulateurepargne} from "../model/simulateurepargne";

@Injectable({
  providedIn: 'root'
})
export class SimuateurepargneService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public Capitalfinal(capitalinitiale :Simulateurepargne,versement:Simulateurepargne,duree:Simulateurepargne): Observable<Simulateurcredit[]> {
    return this.http.get<Simulateurcredit[]>(`${this.host}/simuateurepargne/Capitalfinal/${capitalinitiale}/${versement}/${duree}`);
  }
}
