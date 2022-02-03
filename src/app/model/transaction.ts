import {Account} from "./account";

export class Transaction {
  public id_t: number;
  public date: Date;
  public amount: number;
  public state_t : string ;
  public type_t : string ;
  public ref_account : number ;
  public to_ref_account : number ;
  public step : number ;
  public old_blance_org :number ;
  public new_balance_org : number ;
  public old_balance_dest : number ;
  public new_balance_dest : number ;
  public case_in : number ;
  public case_out : number ;
  public payement : number ;
  public tranfert : number ;
  public fraud : number ;


  constructor() {
    this.id_t = null;
    this.date = null;
    this.amount = null;
    this.state_t = '';
    this.type_t = '';
    this.ref_account = null ;
    this.to_ref_account = null ;
    this.step = null ;
    this.old_blance_org = null ;
    this.new_balance_org = null ;
    this.old_balance_dest = null ;
    this.new_balance_dest = null ;
    this.case_in = null ;
    this.case_out = null ;
    this.payement = null ;
    this.tranfert = null ;
    this.fraud = null;

  }

}
