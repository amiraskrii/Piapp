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
import {Obligation} from "../../model/obligation";
import {ObligationService} from "../../service/obligation.service";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-obligation',
  templateUrl: './obligation.component.html',
  styleUrls: ['./obligation.component.css']
})
export class ObligationComponent implements OnInit,OnDestroy {

  public user: User;
  public obligation : Obligation;
  private subscriptions: Subscription[] = [];

  public obligations: Obligation[];
  public editObligation: Obligation;
  public deleteObligation : Obligation;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private obligationService : ObligationService) {}

  ngOnInit(): void {
    this.getObligations();
  }

  public getObligations(): void {
    this.obligationService.getObligations().subscribe(
      (response: Obligation[]) => {
        this.obligations = response;
        console.log(this.obligations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddObligation(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-obligation-form').click();
    this.obligationService.addObligation(addForm.value).subscribe(
      (response: Obligation) => {
        console.log(response);
        this.getObligations();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateObligation(obligation: Obligation): void {
    this.obligationService.updateObligation(obligation).subscribe(
      (response: Obligation) => {
        console.log(response);
        this.getObligations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteObligation(id_ob: number): void {
    this.obligationService.deleteObligation(id_ob).subscribe(
      (response: void) => {
        console.log(response);
        this.getObligations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onOpenModal(obligation: Obligation, mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addObligationModal');
    }
    if (mode === 'edit') {
      this.editObligation = obligation;
      button.setAttribute('data-target', '#updateObligationModal');
    }
    if (mode === 'delete') {
      this.deleteObligation = obligation;
      button.setAttribute('data-target', '#deleteObligationModal');
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
