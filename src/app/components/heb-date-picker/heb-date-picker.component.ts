import { Component, OnInit, Injectable, Input, ChangeDetectorRef, forwardRef } from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { setYear, setMonth, setDate, getDate, getMonth, getYear } from 'date-fns';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FortigateService } from '../../Services/fortigate.service/fortigate.service';

const I18N_VALUES = {
  'he': {
    weekdays: ['שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון'],
    months: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
  }
  // other languages you would support
};


// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = 'he';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

export const DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => HebDatePickerComponent),
  multi: true
};

@Component({
  selector: 'app-heb-date-picker',
  templateUrl: './heb-date-picker.component.html',
  styleUrls: ['./heb-date-picker.component.css'],
  providers: [
    I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR] // define custom NgbDatepickerI18n provider
})
export class HebDatePickerComponent implements ControlValueAccessor, OnInit {

  @Input() placeholder: string;
  @Input() inputName: string;
  @Input() inputId: string;
  @Input() disabledDates: Array<Date>;
  dateStruct: NgbDateStruct;

  date: Date;
  public disa = true;

  private onChangeCallback: (date: NgbDateStruct) => void = () => {};

  constructor(private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    console.log(this.disabledDates);
  }

  writeValue(date: Date): void {
    if (date) {
      this.date = date;
      this.dateStruct = {
        day: getDate(date),
        month: getMonth(date) + 1,
        year: getYear(date)
      };
      this.cdr.detectChanges();
    } else {
      this.date = new Date();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {}


  updateDate(): void {
    const newDate: Date = setYear(
      setMonth(
        setDate(this.date, this.dateStruct.day),
        this.dateStruct.month - 1
      ),
      this.dateStruct.year
    );
    this.writeValue(newDate);
    this.onChangeCallback(this.dateStruct);
  }

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled = (date: NgbDateStruct) => {
    console.log(this.disabledDates);
    const d = new Date(date.year, date.month - 1, date.day);
    console.log(this.disabledDates[d.toLocaleDateString('he')]);
    if (this.disabledDates[d.toLocaleDateString('he')] > 1) {
      return true;
    }
    // return date.day === 13 || d.getDay() === 0 || d.getDay() === 6;
  }


}
