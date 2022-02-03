import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Subscription} from "rxjs";
import {Conges} from "../../model/conges";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {CongeService} from "../../service/conge.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../enum/notification-type.enum";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-congeclient',
  templateUrl: './congeclient.component.html',
  styleUrls: ['./congeclient.component.css']
})
export class CongeclientComponent implements OnInit,OnDestroy {

  public user: User;
  private subscriptions: Subscription[] = [];

  public congess: Conges[];
  public editConge: Conges;
  public deleteConge : Conges;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private congeService : CongeService) {}

  ngOnInit(): void {
    this.getConge();
  }

  public getConge(): void {
    this.congeService.getConges().subscribe(
      (response: Conges[]) => {
        this.congess = response;
        console.log(this.congess);
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
