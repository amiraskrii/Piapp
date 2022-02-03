import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Transaction} from "../../model/transaction";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {TransactionService} from "../../service/transaction.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../enum/notification-type.enum";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-transactionclient',
  templateUrl: './transactionclient.component.html',
  styleUrls: ['./transactionclient.component.css']
})
export class TransactionclientComponent implements OnInit,OnDestroy {

  public user: User;
  public transaction : Transaction;
  private subscriptions: Subscription[] = [];

  public transactions: Transaction[];
  public editTransaction: Transaction;
  public deleteTransaction : Transaction;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private transactionService : TransactionService) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  public getTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (response: Transaction[]) => {
        this.transactions = response;
        console.log(this.transactions);
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
