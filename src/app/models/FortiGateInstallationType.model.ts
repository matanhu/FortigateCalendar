export class FortiGateInstallationType {
  constructor (
    public id?:  number,

    public name?:  string,
    public days_need_before?:  number,
  ) {
    this.id = 0;
    this.name = '';
    this.days_need_before = 0;
  }
}
