import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../enum/notification-type.enum";
import {Credit_card} from "../../model/credit_card";
import {CreditcardService} from "../../service/creditcard.service";
import {Card_type} from "../../enum/card_type";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditcardComponent implements OnInit,OnDestroy {

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

  public onAddCard(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-card-form').click();
    this.cardService.addCreditcard(addForm.value).subscribe(
      (response: Credit_card) => {
        console.log(response);
        this.getCards();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCard(card: Credit_card): void {
    this.cardService.updateCreditcard(card).subscribe(
      (response: Credit_card) => {
        console.log(response);
        this.getCards();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCard(referance: number): void {
    this.cardService.deleteCreditcard(referance).subscribe(
      (response: void) => {
        console.log(response);
        this.getCards();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onOpenModal(card: Credit_card, mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCardModal');
    }
    if (mode === 'edit') {
      this.editCard = card;
      button.setAttribute('data-target', '#updateCardModal');
    }
    if (mode === 'delete') {
      this.deleteCard = card;
      button.setAttribute('data-target', '#deleteCardModal');
    }

    // @ts-ignore
    container.appendChild(button);
    button.click();
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
