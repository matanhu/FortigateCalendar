import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FortigateService {

  public installations: any;
  constructor(private http: HttpClient) { }

  getAllInstallations(): Observable<any> {
    return this.http.get('../../../assets/FortyGate.json')
      .pipe(
        map((res) => {
          this.installations = res;
          return this.installations;
        }));
  }
}
