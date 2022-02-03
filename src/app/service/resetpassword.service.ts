import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomHttpRespone} from "../model/custom-http-response";

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {
  public host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public resetPassword(email: string): Observable<CustomHttpRespone> {
    return this.http.get<CustomHttpRespone>(`${this.host}/user/resetpassword/${email}`);
  }
}
