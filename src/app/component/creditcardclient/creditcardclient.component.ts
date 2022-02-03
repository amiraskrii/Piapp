import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Credit_card} from "../../model/credit_card";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {CreditcardService} from "../../service/creditcard.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../enum/notification-type.enum";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-creditcardclient',
  templateUrl: './creditcardclient.component.html',
  styleUrls: ['./creditcardclient.component.css']
})
export class CreditcardclientComponent implements OnInit,OnDestroy {

  public user: User;
  public card : Credit_card;
  private subscriptions: Subscription[] = [];

  public cards: Credit_card[];
  public editCard: Credit_card;
  public deleteCard : Credit_card;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private cardService : CreditcardService) {}

  ngOnInit(): void {
    this.getCards();
  }

  public getCards(): void {
    this.cardService.getCreditcards().subscribe(
      (response: Credit_card[]) => {
        this.cards = response;
        console.log(this.cards);
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
