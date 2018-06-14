import { Component, OnInit, Injectable, Input, ChangeDetectorRef, forwardRef, AfterViewChecked } from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { setYear, setMonth, setDate, getDate, getMonth, getYear } from 'date-fns';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FortigateService } from '../../Services/fortigate.service/fortigate.service';
import { isNumber } from 'util';
import { toInteger, padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

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

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('-');
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return {day: toInteger(dateParts[0]), month: null, year: null};
      } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return {day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: null};
      } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return {day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: toInteger(dateParts[2])};
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    return date ?
        `${isNumber(date.day) ? padNumber(date.day) : ''}-${isNumber(date.month) ? padNumber(date.month) : ''}-${date.year}` :
        '';
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
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter},
    DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR] // define custom NgbDatepickerI18n provider
})
export class HebDatePickerComponent implements ControlValueAccessor, OnInit, AfterViewChecked {

  @Input() disabledDates: Array<any>;
  @Input() coutDaysPermited: number;
  @Input() onlyDateAfter: Date;
  @Input() onlyDateBefore: Date;
  @Input() disableSpecificDay: Date;
  dateStruct: NgbDateStruct;
  toDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  hoveredDate: NgbDateStruct;

  date: Date;
  public disa = true;

  dateSelected: Array<Date>;
  dateHashSelected: Array<any>;
  private onChangeCallback: (dateSelected: Array<Date>) => void = () => {};

  constructor(private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    console.log(this.disabledDates);
    this.dateSelected = new Array<Date>();
    this.dateHashSelected = new Array<any>();
  }

  ngAfterViewChecked() {
  }

  writeValue(dates: Array<Date>): void {
    if (dates && dates.length > 0) {
      // this.dateSelected = dates;
      dates.forEach(date => {
        this.dateStruct = {
          day: getDate(date),
          month: getMonth(date) + 1,
          year: getYear(date)
        };
        this.onDateSelect(this.dateStruct);
      });
    } else {
      this.dateSelected = new Array<Date>();
    }
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {}


  updateDate(): void {
    // const newDate: Date = setYear(
    //   setMonth(
    //     setDate(this.date, this.dateStruct.day),
    //     this.dateStruct.month - 1
    //   ),
    //   this.dateStruct.year
    // );
    // this.writeValue(newDate);
    this.onChangeCallback(this.dateSelected);
  }

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 5 || d.getDay() === 6;
  }

  isDisabled = (date: NgbDateStruct, current: {month: number}) => {
    console.log(this.disabledDates);
    const d = new Date(date.year, date.month - 1, date.day);
    console.log(this.disabledDates[d.toLocaleDateString('he')]);
    if (this.coutDaysPermited && (this.dateSelected.length === this.coutDaysPermited)) {
      if (this.dateHashSelected[d.toLocaleDateString('he')]) {
        return false;
      }
      return true;
    }
    if (current.month !== date.month) {
      return;
    }
    if (this.isWeekend(date) ) {
      return true;
    }
    if (this.disabledDates[d.toLocaleDateString('he')] > 4) {
      return true;
    }
    if (this.onlyDateBefore) {
      if (+d > +this.onlyDateBefore) {
        return true;
      }
    }
    if (this.onlyDateAfter) {
      if (+d < +this.onlyDateAfter) {
        return true;
      }
    }
    if (this.disableSpecificDay) {
      if (+d === +this.disableSpecificDay) {
        return true;
      }
    }
    if (+d < +(new Date())) {
      return true;
    }
    // return date.day === 13 || d.getDay() === 0 || d.getDay() === 6;
  }


  onDateSelect(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    // const isSelected = this.dateHashSelected[d.toLocaleDateString('he')];
    const index = this.dateSelected.findIndex(ds => +ds === +d);
    if (index > -1) {
      this.dateHashSelected[d.toLocaleDateString('he')] = false;
      this.dateSelected.splice(index, 1);
    } else {
      this.dateHashSelected[d.toLocaleDateString('he')] = true;
      this.dateSelected.push(d);
    }
    this.updateDate();
    this.cdr.detectChanges();
  }

  isSelected = (date) => {
    const d = new Date(date.year, date.month - 1, date.day);
    if (this.dateHashSelected[d.toLocaleDateString('he')]) {
      return true;
    } else {
      return false;
    }
  }
}
