import { CalendarEvent } from 'angular-calendar';
import { FortiGateInstallationType } from './FortiGateInstallationType.model';

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
    public fortigate_installation_type?: FortiGateInstallationType,
    public preparation_days?: Array<Date>,
    public egedType?: string,
    public eged?: string,
    public installation_date?: Array<Date>,
    public installation_day?: Date,
    public installation_time?: string,
    public installation_initiator?: string,
    public referant?: string,
    public technician?: string,
    public status?: number,
    public line_code?: string,
    public installation_status?: number,
    public installation_remarks?: string,
    public Script_file?: string

  ) {
    this.fortigate_installation_type = new FortiGateInstallationType();
  }
}
