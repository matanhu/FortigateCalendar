import { Component, OnInit } from '@angular/core';
import { FortyCalendarEvent } from '../../models/fortyCalendarEvent';
import { FortigateService } from '../../Services/fortigate.service/fortigate.service';

import * as _ from 'lodash';

import { IDatepickerRange } from '../../components/heb-datepicker-range/heb-datepicker-range.component';
import { ActivatedRoute } from '@angular/router';
import { Referant } from '../../models/Referant.model';
import { FortiGateInstallationType } from '../../models/FortiGateInstallationType.model';


@Component({
  selector: 'app-new-installation-page',
  templateUrl: './new-installation-page.component.html',
  styleUrls: ['./new-installation-page.component.css']
})
export class NewInstallationPageComponent implements OnInit {
  isShowpreparationPicker = true;
  public event = new FortyCalendarEvent(new Date(), '');
  public disabledDates: Array<any>;

  public fromToDate: IDatepickerRange = {
    fromDate: new Date(),
    toDate: new Date()
  };

  public referantsList = new Array<Referant>();
  public fortigate_types = new Array<string>();
  public installationType = new Array<FortiGateInstallationType>();
  constructor(private fortigateService: FortigateService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.event.installation_day = new Date(this.route.snapshot.params['installDate']);
    this.setDisabledDates();
    this.getAllReferants();
    this.getAllFortiGateTypes();
    this.GetAllFortiGateInstallationType();
  }

  onNewInstallation() {
    console.log(this.event);
    this.fortigateService.addInstallation(this.event);
  }

  setDisabledDates() {
    this.disabledDates = _.reduce(this.fortigateService.installations,
      function(counts, install) {
        const date = new Date(install.installation_date);
        counts[date.toLocaleDateString('he')] = (counts[date.toLocaleDateString('he')] || 0) + 1;
        return counts;
      }, {});

      console.log(this.disabledDates);
  }


  onChangeModel(event) {
    console.log('event: ', event);
    console.log('this.fromToDate: ', this.fromToDate);
  }
  getAllReferants() {
    this.fortigateService.GetAllReferants()
      .subscribe(res => {
        this.referantsList = res;
      });
  }

  getAllFortiGateTypes() {
    this.fortigateService.GetAllFortiGateTypes()
      .subscribe((res: Array<string>) => {
        this.fortigate_types = res;
      });
  }

  GetAllFortiGateInstallationType() {
    this.fortigateService.GetAllFortiGateInstallationType()
      .subscribe((res: Array<FortiGateInstallationType>) => {
        this.installationType = res;
      });
  }

  onInstallationTypeChange(ev) {
    this.isShowpreparationPicker = false;
    setTimeout(() => {
      this.isShowpreparationPicker = true;
    });
    this.event.preparation_days = new Array<Date>();

  }

}
