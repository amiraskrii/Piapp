import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Formation} from "../../model/formation";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {FormationService} from "../../service/formation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../enum/notification-type.enum";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-formationclient',
  templateUrl: './formationclient.component.html',
  styleUrls: ['./formationclient.component.css']
})
export class FormationclientComponent implements OnInit,OnDestroy {

  public user: User;
  public formation : Formation;
  private subscriptions: Subscription[] = [];

  public formations: Formation[];
  public editFormation: Formation;
  public deleteFormation : Formation;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private formationService : FormationService) {}

  ngOnInit(): void {
    this.getFormations();
  }

  public getFormations(): void {
    this.formationService.getFormations().subscribe(
      (response: Formation[]) => {
        this.formations = response;
        console.log(this.formations);
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
