import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Simulateurcredit} from "../model/simulateurcredit";
import {Salaire} from "../model/salaire";


@Injectable({
  providedIn: 'root'
})
export class SimuateurcreditService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public Remboursementmensuel(totaleprixacquisition : Simulateurcredit,dureederemboursement:Simulateurcredit): Observable<number> {
    return this.http.get<number>(`${this.host}/simuateurcredit/Remboursementmensuel/${totaleprixacquisition}/${dureederemboursement}`);
  }

  public FinancementSollicite(totaleprixacquisition : Simulateurcredit,apportpropre:Simulateurcredit): Observable<number> {
    return this.http.get<number>(`${this.host}/simuateurcredit/FinancementSollicite/${totaleprixacquisition}/${apportpropre}`);
  }

  public Tauxdendettementmensuel(dureederemboursement : Simulateurcredit,revenubrut:Simulateurcredit): Observable<number> {
    return this.http.get<number>(`${this.host}/simuateurcredit/Tauxdendettementmensuel/${dureederemboursement}/${revenubrut}`);
  }

  public Fraisdetudededossier(totaleprixacquisition : Simulateurcredit): Observable<Simulateurcredit[]> {
    return this.http.get<Simulateurcredit[]>(`${this.host}/simuateurcredit/Fraisdetudededossier/${totaleprixacquisition}`);
  }




}
