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
import {ActionService} from "../../service/action.service";
import {Action} from "../../model/action";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit,OnDestroy {

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

public onAddAction(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-action-form').click();
    this.actionService.addAction(addForm.value).subscribe(
      (response: Action) => {
        console.log(response);
        this.getActions();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

public onUpdateAction(action: Action): void {
    this.actionService.updateAction(action).subscribe(
      (response: Action) => {
        console.log(response);
        this.getActions();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

public onDeleteAction(id_act: number): void {
    this.actionService.deleteAction(id_act).subscribe(
      (response: void) => {
        console.log(response);
        this.getActions();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



public onOpenModal(action: Action, mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
    button.setAttribute('data-target', '#addActionModal');
  }
  if (mode === 'edit') {
    this.editAction = action;
    button.setAttribute('data-target', '#updateActionModal');
  }
  if (mode === 'delete') {
    this.deleteAction = action;
    button.setAttribute('data-target', '#deleteActionModal');
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
