import { Component, OnInit } from '@angular/core';
import { FortyCalendarEvent } from '../../models/fortyCalendarEvent';
import { FortigateService } from '../../Services/fortigate.service/fortigate.service';

import * as _ from 'lodash';


@Component({
  selector: 'app-new-installation-page',
  templateUrl: './new-installation-page.component.html',
  styleUrls: ['./new-installation-page.component.css']
})
export class NewInstallationPageComponent implements OnInit {
  public event = new FortyCalendarEvent(new Date(), '');
  public disabledDates: Array<any>;
  constructor(private fortigateService: FortigateService) { }

  ngOnInit() {
    this.setDisabledDates();
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

}
