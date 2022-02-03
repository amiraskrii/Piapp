import {Component, OnDestroy, OnInit} from '@angular/core';
import {Simulateurcredit} from "../../model/simulateurcredit";
import {NotificationType} from "../../enum/notification-type.enum";
import {Role} from "../../enum/role.enum";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {SalaireService} from "../../service/salaire.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-simulateurcreditclient',
  templateUrl: './simulateurcreditclient.component.html',
  styleUrls: ['./simulateurcreditclient.component.css']
})
export class SimulateurcreditclientComponent implements OnInit,OnDestroy {


  public totaleprixacquisition  ;
  public apportpropre  ;
  public dureederemboursement  ;
  public revenubrut  ;

  public fs;
  public taux ;
  public fe ;
  public rm ;

  private subscriptions: Subscription[] = [];

  public simul : Simulateurcredit [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService) {}

  ngOnInit(): void {

  }



  public onFinancementSollicite():void{
    console.log(this.totaleprixacquisition);
    console.log(this.apportpropre);
    this.fs=  this.totaleprixacquisition-this.apportpropre ;
  }

  public Tauxdendettementmensuel():void{

    this.taux=   this.dureederemboursement/this.revenubrut ;
  }

  public Fraisdetudededossier():void{
    this.fe =  this.totaleprixacquisition*2/100 ;
  }

  public Remboursementmensuel():void{
    this.rm =  this.totaleprixacquisition*2/100 ;
  }

  public onOpenModal( mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCreditModal');
      this.onFinancementSollicite();
      this.Tauxdendettementmensuel();
      this.Fraisdetudededossier();
      this.Remboursementmensuel();
    }


    container.appendChild(button);
    button.click();
  }

  public clearForm():void{
    (<HTMLFormElement>document.getElementById("form1")).reset();
  }

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
    this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  public get isClient(): boolean {
    return this.getUserRole() === Role.Client ;
  }

  public get isAgent(): boolean {
    return this.getUserRole() === Role.Agent ;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
