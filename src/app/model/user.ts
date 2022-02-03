export class User {
  public id: number ;
  public userId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public lastLoginDate: Date;
  public lastLoginDateDisplay: Date;
  public joinDate: Date;
  public active: boolean;
  public notLocked: boolean;
  public role: string;
  public authorities: [];
  public sex : string ;
  public education_level : string ;
  public occupation : string ;
  public hobbies : string ;
  public relationship : string ;

  constructor() {
    this.id = null ;
    this.userId = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.lastLoginDate = null;
    this.lastLoginDateDisplay = null;
    this.joinDate = null;
    this.active = false;
    this.notLocked = false;
    this.role = '';
    this.authorities = [];
    this.sex = '';
    this.education_level = '';
    this.occupation = '';
    this.hobbies = '';
    this.relationship = '';
  }

}
