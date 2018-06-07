import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FortigateService {

  constructor(private http: HttpClient) { }

  getAllInstallations(): Observable<any> {
    return this.http.get('../../../assets/FortyGate.json');
  }
}
