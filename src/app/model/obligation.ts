export class Obligation {
  public id_ob: number;
  public valeurnominale: number;
  public dataEmission: Date;
  public tauxActuariel: number;
  public volume: number;
  public variation: number;
  public coupon: number;
  public nomEntreprise: string;
  public nombreannee: number ;
  public valeuractuelle : number ;


  constructor() {
    this.id_ob = null;
    this.valeurnominale = null;
    this.dataEmission = null;
    this.tauxActuariel = null;
    this.volume = null;
    this.variation = null;
    this.coupon = null;
    this.nomEntreprise = '';
    this.nombreannee=null ;
    this.valeuractuelle = null ;

  }

}
