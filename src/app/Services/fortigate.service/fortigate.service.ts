import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { FortyCalendarEvent } from '../../models/fortyCalendarEvent';
import { environment } from '../../../environments/environment';
import { Referant } from '../../models/Referant.model';

@Injectable({
  providedIn: 'root'
})
export class FortigateService {
  public installations: Array<any>;
  public referants: Array<Referant>;
  constructor(private http: HttpClient) {}

  GetAllReferants() {
    return this.http
      .get(`${environment.baseUrl}fortigate/GetAllReferants`)
        .pipe(
          map((res: Array<any>) => {
            this.referants = res;
            return this.referants;
          })
      );
  }

  getAllInstallations(): Observable<any> {
    return this.http
      .get(`${environment.baseUrl}fortigate/GetAllInstallation`)
        .pipe(
          map((res: Array<any>) => {
            this.installations = res;
            return this.installations;
          })
      );
  }

  addInstallation(event: FortyCalendarEvent) {
    this.installations.push(event);
  }

  GetAllFortiGateTypes() {
    return this.http
      .get(`${environment.baseUrl}fortigate/GetAllFortiGateTypes`);
  }

  GetAllFortiGateInstallationType() {
    return this.http
      .get(`${environment.baseUrl}fortigate/GetAllFortiGateInstallationType`);
  }
}
