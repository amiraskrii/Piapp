import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Subscription} from "rxjs";
import {Action} from "../../model/action";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {ActionService} from "../../service/action.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../enum/notification-type.enum";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-actionclient',
  templateUrl: './actionclient.component.html',
  styleUrls: ['./actionclient.component.css']
})
export class ActionclientComponent implements OnInit,OnDestroy {

  public user: User;
  private subscriptions: Subscription[] = [];

  public actions: Action[];
  public editAction: Action;
  public deleteAction : Action;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private actionService : ActionService) {}

  ngOnInit(): void {
    this.getActions();
  }

  public getActions(): void {
    this.actionService.getActions().subscribe(
      (response: Action[]) => {
        this.actions = response;
        console.log(this.actions);
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
