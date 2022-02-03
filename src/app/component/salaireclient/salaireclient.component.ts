import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Salaire} from "../../model/salaire";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {SalaireService} from "../../service/salaire.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../enum/notification-type.enum";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-salaireclient',
  templateUrl: './salaireclient.component.html',
  styleUrls: ['./salaireclient.component.css']
})
export class SalaireclientComponent implements OnInit,OnDestroy {

  public user: User;
  public salaire : Salaire;
  private subscriptions: Subscription[] = [];

  public salaires: Salaire[];
  public editSalaire: Salaire;
  public deleteSalaire : Salaire;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private salaireService : SalaireService) {}

  ngOnInit(): void {
    this.getSalaires();
  }

  public getSalaires(): void {
    this.salaireService.getSalaires().subscribe(
      (response: Salaire[]) => {
        this.salaires = response;
        console.log(this.salaires);
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
