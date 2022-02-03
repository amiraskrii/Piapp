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
import {Conges} from "../../model/conges";
import {CongeService} from "../../service/conge.service";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit,OnDestroy {

  public user: User;
  private subscriptions: Subscription[] = [];

  public congess: Conges[];
  public editConge: Conges;
  public deleteConge : Conges;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private congeService : CongeService) {}

  ngOnInit(): void {
    this.getConge();
  }

  public getConge(): void {
    this.congeService.getConges().subscribe(
      (response: Conges[]) => {
        this.congess = response;
        console.log(this.congess);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddConges(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-conge-form').click();
    this.congeService.addConge(addForm.value).subscribe(
      (response: Conges) => {
        console.log(response);
        this.getConge();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateConge(conge: Conges): void {
    this.congeService.updateConge(conge).subscribe(
      (response: Conges) => {
        console.log(response);
        this.getConge();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteConge(id_c: number): void {
    this.congeService.deleteConge(id_c).subscribe(
      (response: void) => {
        console.log(response);
        this.getConge();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onOpenModal(conge: Conges, mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCongeModal');
    }
    if (mode === 'edit') {
      this.editConge = conge;
      button.setAttribute('data-target', '#updateCongeModal');
    }
    if (mode === 'delete') {
      this.deleteConge = conge;
      button.setAttribute('data-target', '#deleteCongeModal');
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
