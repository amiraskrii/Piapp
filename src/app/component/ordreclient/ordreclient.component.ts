import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Ordre} from "../../model/ordre";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {OrdreService} from "../../service/ordre.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../enum/notification-type.enum";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-ordreclient',
  templateUrl: './ordreclient.component.html',
  styleUrls: ['./ordreclient.component.css']
})
export class OrdreclientComponent implements OnInit,OnDestroy {

  public user: User;
  public ordre : Ordre;
  private subscriptions: Subscription[] = [];

  public ordres: Ordre[];
  public editOrdre: Ordre;
  public deleteOrdre : Ordre;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private ordreService : OrdreService) {}

  ngOnInit(): void {
    this.getOrdres();
  }

  public getOrdres(): void {
    this.ordreService.getOrdres().subscribe(
      (response: Ordre[]) => {
        this.ordres = response;
        console.log(this.ordres);
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
