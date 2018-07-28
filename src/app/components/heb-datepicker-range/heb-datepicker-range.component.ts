import { Component, OnInit, Injectable, Input, ChangeDetectorRef, forwardRef, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbDateParserFormatter, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { setYear, setMonth, setDate, getDate, getMonth, getYear, addDays, differenceInDays } from 'date-fns';
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

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

const isMoreThenThirtyDays = (one: Date, two: Date) =>  differenceInDays(one, two) > 30;



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
  useExisting: forwardRef(() => HebDatepickerRangeComponent),
  multi: true
};

export interface IDatepickerRange {
  fromDate: Date;
  toDate: Date;
}

@Component({
  selector: 'app-heb-datepicker-range',
  templateUrl: './heb-datepicker-range.component.html',
  styleUrls: ['./heb-datepicker-range.component.css'],
  providers: [
    I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter},
    DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR] // define custom NgbDatepickerI18n provider
})
export class HebDatepickerRangeComponent implements ControlValueAccessor, OnInit {

  // @ViewChild('dpFrom') dpFrom: NgbDatepicker;
  // @ViewChild('dpTo') dpTo: NgbDatepicker;
  @Input() placeholder: string;
  @Input() inputName: string;
  @Input() inputId: string;

  dateStruct: NgbDateStruct;

  fromTodate: IDatepickerRange;

  public disa = true;



  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;


  private onChangeCallback: (fromToDate: IDatepickerRange) => void = () => {};

  constructor(private cdr: ChangeDetectorRef, calendar: NgbCalendar) {
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
  }

  writeValue(fromTodate: IDatepickerRange): void {
    if (fromTodate) {
      this.fromTodate.fromDate = fromTodate.fromDate;
      this.fromTodate.toDate = fromTodate.toDate;
      if (this.fromDate) {
        this.fromDate = {
          day: fromTodate.fromDate.getDate(),
          month: fromTodate.fromDate.getMonth() + 1,
          year: fromTodate.fromDate.getFullYear()
        };
      }
      if (this.toDate) {
        this.toDate = {
          day: fromTodate.toDate.getDate(),
          month: fromTodate.toDate.getMonth() + 1,
          year: fromTodate.toDate.getFullYear()
        };
      }
      this.cdr.detectChanges();
    } else {
      this.fromTodate = {
        fromDate: new Date(),
        toDate: new Date()
      };
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {}


  // updateDate(): void {
  //   const newDate: Date = setYear(
  //     setMonth(
  //       setDate(this.date, this.dateStruct.day),
  //       this.dateStruct.month - 1
  //     ),
  //     this.dateStruct.year
  //   );
  //   this.writeValue(newDate);
  //   this.onChangeCallback(this.dateStruct);
  // }

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }


  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.fromTodate.fromDate = new Date(date.year, date.month - 1, date.day);
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      this.fromTodate.toDate = new Date(date.year, date.month - 1, date.day);
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.fromTodate.fromDate = new Date(date.year, date.month - 1, date.day);
      this.fromTodate.toDate = null;
    }
    this.writeValue(this.fromTodate);
    this.onChangeCallback(this.fromTodate);
  }

  // onFromClick() {
  //   this.dpTo.close();
  //   if (this.dpFrom.isOpen()) {
  //     this.dpFrom.close();
  //   } else {
  //     this.dpFrom.open();
  //   }
  // }
  // onToClick() {
  //   this.dpFrom.close();
  //   if (this.dpTo.isOpen()) {
  //     this.dpTo.close();
  //   } else {
  //     this.dpTo.open();
  //   }
  // }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  // tslint:disable-next-line:max-line-length
  isDisabled = date => this.fromDate && isMoreThenThirtyDays(new Date(date.year, date.month - 1, date.day), new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day));
}
