import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private http: HttpClient) { }

  getConsultation(adress, phone, complect) {
    const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(adress, { phone: phone, complect: complect }, { headers: myHeaders }).subscribe();
      // location.reload(true);
  }
}
