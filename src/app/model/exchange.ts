export class Exchange {
  table: string;
  no: string;
  effectiveDate: string;
  rates: Rate[];

  constructor() {
  this.table = '';
  this.no = '';
  this.effectiveDate = '';
  this.rates= null;

}
}

export class Rate {
  currency: string;
  code: string;
  mid: number;

  constructor() {
    this.currency = '';
    this.code = '';
    this.mid= null;

  }
}
