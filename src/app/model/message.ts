export class Message {
  public id_msg: number;
  public content: string;
  public subject: string;
  public date_envoi: Date;
  public date_rep: Date;
  public etat: string;
  public reponse : string ;


  constructor() {
    this.id_msg = null;
    this.content = '';
    this.subject = '';
    this.date_envoi = null;
    this.date_rep = null;
    this.etat = '';
    this.reponse = '';
  }

}
