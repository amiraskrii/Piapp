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
import {Transaction} from "../../model/transaction";
import {TransactionService} from "../../service/transaction.service";
import {Role} from "../../enum/role.enum";
import {Account} from "../../model/account";
import {AccountService} from "../../service/account.service";
import {Reclamation_assurance} from "../../model/reclamation_assurance";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit,OnDestroy {

  public user: User;
  public transaction : Transaction;
  private subscriptions: Subscription[] = [];

  public transactions: Transaction[];
  public editTransaction: Transaction;
  public deleteTransaction : Transaction;

  public accounts : Account ;
  public acc : Account [] ;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private transactionService : TransactionService, private accountService : AccountService) {}

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

  public getAccounts(): void {
    this.accountService.getAccounts().subscribe(
      (response: Account[]) => {
        this.acc = response;
        console.log(this.acc);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddTransaction(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-transaction-form').click();
    this.transactionService.addTransaction(addForm.value).subscribe(
      (response: Transaction) => {
        console.log(response);
        this.getTransactions();
        this.transaction.fraud = this.onAddAML(this.transactions);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onAddAML(transactions): any {
    // @ts-ignore
    document.getElementById('add-transaction-form').click();
    this.transactionService.addAML(transactions).subscribe(
      (response: Transaction[]) => {
        console.log(response);
        this.getTransactions();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateTransaction(transaction: Transaction): void {
    this.transactionService.updateTransaction(transaction).subscribe(
      (response: Transaction) => {
        console.log(response);
        this.getTransactions();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTransaction(id_t: number): void {
    this.transactionService.deleteTransaction(id_t).subscribe(
      (response: void) => {
        console.log(response);
        this.getTransactions();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onOpenModal(transaction: Transaction, mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTransactionModal');
    }
    if (mode === 'edit') {
      this.editTransaction = transaction;
      button.setAttribute('data-target', '#updateTransactionModal');
    }
    if (mode === 'delete') {
      this.deleteTransaction = transaction;
      button.setAttribute('data-target', '#deleteTransactionModal');
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
