import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Reclamation_assurance} from "../../model/reclamation_assurance";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {ReclamationassuranceService} from "../../service/reclamationassurance.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {NotificationType} from "../../enum/notification-type.enum";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-reclamation-assuranceclient',
  templateUrl: './reclamation-assuranceclient.component.html',
  styleUrls: ['./reclamation-assuranceclient.component.css']
})
export class ReclamationAssuranceclientComponent implements OnInit,OnDestroy {

  public user: User;
  public reclamationAssurance : Reclamation_assurance;
  private subscriptions: Subscription[] = [];

  public reclamationAssurances: Reclamation_assurance[];
  public editReclamation_assurance: Reclamation_assurance;
  public deleteReclamation_assurance : Reclamation_assurance;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private reclamationassuranceService : ReclamationassuranceService) {}

  ngOnInit(): void {
    this.getReclamation_assurances();
  }

  public getReclamation_assurances(): void {
    this.reclamationassuranceService.getReclamationassurances().subscribe(
      (response: Reclamation_assurance[]) => {
        this.reclamationAssurances = response;
        console.log(this.reclamationAssurances);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddReclamation_assurance(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-reclamationassurance-form').click();
    this.reclamationassuranceService.addReclamationassurance(addForm.value).subscribe(
      (response: Reclamation_assurance) => {
        console.log(response);
        this.reclamationAssurance.fraud = this.onAddAssurance(this.reclamationAssurances);
        this.getReclamation_assurances();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onAddAssurance(reclamationAssurances): any {
    // @ts-ignore
    document.getElementById('add-reclamationassurance-form').click();
    this.reclamationassuranceService.addAssurance(reclamationAssurances).subscribe(
      (response: Reclamation_assurance[]) => {
        console.log(response);
        this.getReclamation_assurances();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);

      }
    );
  }

  public onUpdateReclamation_assurance(reclamationAssurance: Reclamation_assurance): void {
    this.reclamationassuranceService.updateReclamationassurance(reclamationAssurance).subscribe(
      (response: Reclamation_assurance) => {
        console.log(response);
        this.getReclamation_assurances();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteReclamation_assurance(id_r: number): void {
    this.reclamationassuranceService.deleteReclamationassurance(id_r).subscribe(
      (response: void) => {
        console.log(response);
        this.getReclamation_assurances();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onOpenModal(reclamationAssurance: Reclamation_assurance, mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addReclamationassuranceModal');
    }
    if (mode === 'edit') {
      this.editReclamation_assurance = reclamationAssurance;
      button.setAttribute('data-target', '#updateReclamationassuranceModal');
    }
    if (mode === 'delete') {
      this.deleteReclamation_assurance = reclamationAssurance;
      button.setAttribute('data-target', '#deleteReclamationassuranceModal');
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
