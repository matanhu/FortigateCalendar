import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CalendarComponentComponent } from './calendar-component/calendar-component.component';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponentComponent,
    DateTimePickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
