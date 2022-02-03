export class Reclamation_assurance {
  public id_r: number;
  public policy_state: string;
  public policy_csl: string;
  public incident_type: string;
  public incident_severity: string;
  public incident_state: string;
  public incident_city: string;
  public auto_make: string;
  public auto_model: string;
  public collision_type: string;
  public proprety_damage: string;
  public policy_report_available: string;
  public authorities_contacted: string;
  public amount_to_refand: string;
  public state: string;
  public fraud : number ;

  constructor() {
    this.id_r = null;
    this.policy_state = '';
    this.policy_csl = '';
    this.incident_type = '';
    this.incident_severity = '';
    this.incident_state = '';
    this.incident_city = '';
    this.auto_make = '';
    this.auto_model = '';
    this.collision_type = '';
    this.proprety_damage = '';
    this.policy_report_available = '';
    this.authorities_contacted = '';
    this.amount_to_refand = '';
    this.state = '';
    this.fraud = null ;
  }

}
