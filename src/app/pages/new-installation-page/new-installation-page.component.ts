import { Component, OnInit } from '@angular/core';
import { FortyCalendarEvent } from '../../models/fortyCalendarEvent';


@Component({
  selector: 'app-new-installation-page',
  templateUrl: './new-installation-page.component.html',
  styleUrls: ['./new-installation-page.component.css']
})
export class NewInstallationPageComponent implements OnInit {
  public event = new FortyCalendarEvent(new Date(), '');
  constructor() { }

  ngOnInit() {
  }

}
