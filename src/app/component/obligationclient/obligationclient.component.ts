import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Obligation} from "../../model/obligation";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {ObligationService} from "../../service/obligation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../enum/notification-type.enum";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-obligationclient',
  templateUrl: './obligationclient.component.html',
  styleUrls: ['./obligationclient.component.css']
})
export class ObligationclientComponent implements OnInit,OnDestroy {

  public user: User;
  public obligation : Obligation;
  private subscriptions: Subscription[] = [];

  public obligations: Obligation[];
  public editObligation: Obligation;
  public deleteObligation : Obligation;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private obligationService : ObligationService) {}

  ngOnInit(): void {
    this.getObligations();
  }

  public getObligations(): void {
    this.obligationService.getObligations().subscribe(
      (response: Obligation[]) => {
        this.obligations = response;
        console.log(this.obligations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
