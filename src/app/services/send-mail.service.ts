import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  public done: boolean = false;
  public orderComplect: boolean = false;
  public moreDetailed: boolean = false;

  constructor(private http: HttpClient) { }

  getConsultation(adress, phone, name, complect) {
    const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(adress, { phone: phone, name: name, complect: complect }, { headers: myHeaders }).subscribe();
  }
}
