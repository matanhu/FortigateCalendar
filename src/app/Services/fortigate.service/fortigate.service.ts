import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { FortyCalendarEvent } from '../../models/fortyCalendarEvent';


@Injectable({
  providedIn: 'root'
})
export class FortigateService {

  public installations: Array<any>;
  constructor(private http: HttpClient) { }

  getAllInstallations(): Observable<any> {
    if(!this.installations) {
    return this.http.get('../../../assets/FortyGate.json')
      .pipe(
        map((res: Array<any>) => {
          this.installations = res;
          return this.installations;
        }));
      }
      else {
        return new Observable(observer => {
            observer.next(this.installations);
            observer.complete();
          });
      }
  }

  addInstallation(event: FortyCalendarEvent) {
    this.installations.push(event);
  }
}
