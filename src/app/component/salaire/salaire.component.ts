import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Reclamation_assurance} from "../../model/reclamation_assurance";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../enum/notification-type.enum";
import {Salaire} from "../../model/salaire";
import {SalaireService} from "../../service/salaire.service";
import {Role} from "../../enum/role.enum";
import {StatisticService} from "../../service/statistic.service";
import {Statistic} from "../../model/statistic";
import {Statisticuser} from "../../model/statisticuser";
import {Statisticsalaire} from "../../model/statisticsalaire";

@Component({
  selector: 'app-salaire',
  templateUrl: './salaire.component.html',
  styleUrls: ['./salaire.component.css']
})
export class SalaireComponent implements OnInit,OnDestroy {

  public user: User;
  public salaire : Salaire;
  private subscriptions: Subscription[] = [];

  public salaires: Salaire[];
  public editSalaire: Salaire;
  public deleteSalaire : Salaire;

  public staticsUser: Statisticuser;
  public staticsSal : Statisticsalaire ;



  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private salaireService : SalaireService,
               private statisticService : StatisticService ) {}

  ngOnInit(): void {
    this.getSalaires();
    this.getSumsalaire();
    this.getCountUser();
  }



  public getSalaires(): void {
    this.salaireService.getSalaires().subscribe(
      (response: Salaire[]) => {
        this.salaires = response;
        console.log(this.salaires);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getSumsalaire(): void {
    this.statisticService.getsumsalaire().subscribe(
      (response: Statisticsalaire) => {
        this.staticsSal = response;
        console.log(this.staticsSal);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCountUser(): void {
    this.statisticService.getcountAgent().subscribe(
      (response: Statisticuser) => {
        this.staticsUser = response;
        console.log(this.staticsUser);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddSalaire(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-salaire-form').click();
    this.salaireService.addSalaire(addForm.value).subscribe(
      (response: Salaire) => {
        console.log(response);
        this.getSalaires();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateSalaire(salaire: Salaire): void {
    this.salaireService.updateSalaire(salaire).subscribe(
      (response: Salaire) => {
        console.log(response);
        this.getSalaires();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteSalaire(id_s: number): void {
    this.salaireService.deleteSalaire(id_s).subscribe(
      (response: void) => {
        console.log(response);
        this.getSalaires();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onOpenModal(salaire: Salaire, mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSalaireModal');
    }
    if (mode === 'edit') {
      this.editSalaire = salaire;
      button.setAttribute('data-target', '#updateSalaireModal');
    }
    if (mode === 'delete') {
      this.deleteSalaire = salaire;
      button.setAttribute('data-target', '#deleteSalaireModal');
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
