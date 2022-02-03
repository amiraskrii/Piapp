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
import {Formation} from "../../model/formation";
import {FormationService} from "../../service/formation.service";
import {Role} from "../../enum/role.enum";
import {Statistic} from "../../model/statistic";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit,OnDestroy {

  public user: User;
  public formation : Formation;
  private subscriptions: Subscription[] = [];

  public formations: Formation[];
  public statics: Statistic;
  public editFormation: Formation;
  public deleteFormation : Formation;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService,
              private formationService : FormationService) {}

  ngOnInit(): void {
    this.getFormations();
    this.getStatistic();
  }

  public getStatistic(): void {
    this.formationService.getStatistic().subscribe(
      (response: Statistic) => {
        this.statics = response;
        console.log(this.statics);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getFormations(): void {
    this.formationService.getFormations().subscribe(
      (response: Formation[]) => {
        this.formations = response;
        console.log(this.formations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddFormation(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-formation-form').click();
    this.formationService.addFormation(addForm.value).subscribe(
      (response: Formation) => {
        console.log(response);
        this.getFormations();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateFormation(formation: Formation): void {
    this.formationService.updateFormation(formation).subscribe(
      (response: Formation) => {
        console.log(response);
        this.getFormations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteFormation(id_: number): void {
    this.formationService.deleteFormation(id_).subscribe(
      (response: void) => {
        console.log(response);
        this.getFormations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onOpenModal(formation: Formation, mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addFormationModal');
    }
    if (mode === 'edit') {
      this.editFormation = formation;
      button.setAttribute('data-target', '#updateFormationModal');
    }
    if (mode === 'delete') {
      this.deleteFormation = formation;
      button.setAttribute('data-target', '#deleteFormationModal');
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
