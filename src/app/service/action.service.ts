import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Action} from "../model/action";

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}


  public getActions(): Observable<Action[]> {
    return this.http.get<Action[]>(`${this.host}/action/retrieve-all-Action`);
  }

  public addAction(action : Action): Observable<Action> {
    return this.http.post<Action>(`${this.host}/action/add-Action`,action);
  }

  public updateAction(action : Action): Observable<Action> {
    return this.http.put<Action>(`${this.host}/action/modify-Action`,action);
  }

  public deleteAction(id_act : number): Observable<void> {
    return this.http.delete<void>(`${this.host}/action/remove-Action/${id_act}`);
  }

  public getActionById(id_act: number): Observable<Action> {
    return this.http.get<Action>(`${this.host}/action/retrieve-Action/${id_act}`);
  }

}
