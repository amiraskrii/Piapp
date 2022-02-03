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
import {Ordre} from "../../model/ordre";
import {OrdreService} from "../../service/ordre.service";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-ordre',
  templateUrl: './ordre.component.html',
  styleUrls: ['./ordre.component.css']
})
export class OrdreComponent implements OnInit,OnDestroy {

  public user: User;
  public ordre : Ordre;
  private subscriptions: Subscription[] = [];

  public ordres: Ordre[];
  public editOrdre: Ordre;
  public deleteOrdre : Ordre;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private ordreService : OrdreService) {}

  ngOnInit(): void {
    this.getOrdres();
  }

  public getOrdres(): void {
    this.ordreService.getOrdres().subscribe(
      (response: Ordre[]) => {
        this.ordres = response;
        console.log(this.ordres);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddOrdre(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-ordre-form').click();
    this.ordreService.addOrdre(addForm.value).subscribe(
      (response: Ordre) => {
        console.log(response);
        this.getOrdres();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateOrdre(ordre: Ordre): void {
    this.ordreService.updateOrdre(ordre).subscribe(
      (response: Ordre) => {
        console.log(response);
        this.getOrdres();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteOrdre(id_o: number): void {
    this.ordreService.deleteOrdre(id_o).subscribe(
      (response: void) => {
        console.log(response);
        this.getOrdres();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onOpenModal(ordre: Ordre, mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addOrdreModal');
    }
    if (mode === 'edit') {
      this.editOrdre = ordre;
      button.setAttribute('data-target', '#updateOrdreModal');
    }
    if (mode === 'delete') {
      this.deleteOrdre = ordre;
      button.setAttribute('data-target', '#deleteOrdreModal');
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
