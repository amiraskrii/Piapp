import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Subscription} from "rxjs";
import {Compte_titre} from "../../model/compte_titre";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {ComptetitreService} from "../../service/comptetitre.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../enum/notification-type.enum";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-comptetitreclient',
  templateUrl: './comptetitreclient.component.html',
  styleUrls: ['./comptetitreclient.component.css']
})
export class ComptetitreclientComponent implements OnInit,OnDestroy {

  public user: User;
  private subscriptions: Subscription[] = [];

  public comptes: Compte_titre[];
  public editCompte: Compte_titre;
  public deleteCompte : Compte_titre;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private compteService : ComptetitreService) {}

  ngOnInit(): void {
    this.getCompte();
  }

  public getCompte(): void {
    this.compteService.getComptetitres().subscribe(
      (response: Compte_titre[]) => {
        this.comptes = response;
        console.log(this.comptes);
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
