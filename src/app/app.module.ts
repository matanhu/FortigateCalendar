import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CalendarComponentComponent } from './components/calendar-component/calendar-component.component';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { AppRoutingModule } from './Routing/app-routing.module';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { NewInstallationPageComponent } from './pages/new-installation-page/new-installation-page.component';
import { registerLocaleData } from '@angular/common';
import localeHe from '@angular/common/locales/he';
import { HebDatePickerComponent } from './components/heb-date-picker/heb-date-picker.component';
import { HebDatepickerRangeComponent } from './components/heb-datepicker-range/heb-datepicker-range.component';
import { TextMaskModule } from 'angular2-text-mask';


registerLocaleData(localeHe);


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponentComponent,
    DateTimePickerComponent,
    CalendarPageComponent,
    NewInstallationPageComponent,
    HebDatePickerComponent,
    HebDatepickerRangeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    AppRoutingModule,
    TextMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//Test checkout new Branch
