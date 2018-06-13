import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  parse,
  setDate,
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  format
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewDay,
  CalendarDateFormatter,
} from 'angular-calendar';
import { FortigateService } from '../../Services/fortigate.service/fortigate.service';
import { FortyCalendarEvent } from '../../models/fortyCalendarEvent';
import { CustomDateFormatter } from '../../Providers/custom-date-formatter.provider';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar-component',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-component.component.html',
  styleUrls: ['./calendar-component.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponentComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  private modalRef: NgbModalRef;

  locale: string = 'he';

  view = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: FortyCalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: FortyCalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: FortyCalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  public events: FortyCalendarEvent[];

  public dayEvents: FortyCalendarEvent[] = [];
  activeDayIsOpen = true;

  constructor(private modal: NgbModal, private fortigatService: FortigateService) {}

  ngOnInit() {
    this.fortigatService.getAllInstallations().subscribe(
      (res: Array<any>) => {
        this.events = res.map((e) => {
          const newEvent: FortyCalendarEvent<any> = {
            ...e,
            start: parse(new Date(e.installation_date)),
            end: e.end ? new Date(e.end) : addHours(new Date(e.installation_date), 3),
            title: `<div class="inline-block"><div>${e.customer_name}</div><div>${e.line_code}</div></div>`,
            id: e.id,
            color: colors.red,
            actions: this.actions
          };
          return newEvent;
        });
        this.refresh.next();
      });
  }

  dayClicked({ date, events }: { date: Date; events: FortyCalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
        this.setDayEvents(events);
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: FortyCalendarEvent): void {
    this.modalData = { event, action };
    this.modalRef = this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  setDayEvents(events: FortyCalendarEvent[]) {
    this.dayEvents = events;
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    console.log(format(getStart(this.viewDate), 'YYYY-MM-DD'));
    console.log(format(getEnd(this.viewDate), 'YYYY-MM-DD'));
  }

  closeModal() {
    this.modalRef.close();
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.events.length > 2) {
        day.cssClass = 'day-closed';
      }
    });
  }
}
