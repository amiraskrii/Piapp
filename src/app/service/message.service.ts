import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../model/message";


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}


  public getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.host}/message/retrieve-all-messages`);
  }

  public addMessage(msg : Message): Observable<Message> {
    return this.http.post<Message>(`${this.host}/message/add-message`,msg);
  }

  public updateMessage(msg : Message): Observable<Message> {
    return this.http.put<Message>(`${this.host}/message/modify-message`,msg);
  }

  public deleteMessage(id_msg : number): Observable<void> {
    return this.http.delete<void>(`${this.host}/message/remove-message/${id_msg}`);
  }

  public getMessageById(id_msg: number): Observable<Message> {
    return this.http.get<Message>(`${this.host}/message/retrieve-message/${id_msg}`);
  }
}
