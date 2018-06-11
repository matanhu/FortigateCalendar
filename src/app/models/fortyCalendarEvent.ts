import { CalendarEvent } from 'angular-calendar';

export class FortyCalendarEvent<MetaType = any> implements CalendarEvent {
  constructor (
    public start: Date,
    public title: string,
    public id?: string | number,
    public end?: Date,
    public color?,
    public actions?,
    public allDay?: boolean,
    public cssClass?: string,
    public resizable?: { beforeStart?: boolean; afterEnd?: boolean; },
    public draggable?: boolean,
    public meta?: MetaType,
    /****************************************************************************************************/
    public customer_name?: string,
    public fortigate_type?: string,
    public egedType?: string,
    public eged?: string,
    public installation_date?: string,
    public installation_day?: string,
    public installation_time?: string,
    public installation_initiator?: string,
    public referant?: string,
    public technician?: string,
    public status?: number,
    public line_code?: string,
    public installation_status?: number,
    public installation_remarks?: string,
    public Script_file?: string

  ) { }




}
