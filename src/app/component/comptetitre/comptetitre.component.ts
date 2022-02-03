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
import {Compte_titre} from "../../model/compte_titre";
import {ComptetitreService} from "../../service/comptetitre.service";
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-comptetitre',
  templateUrl: './comptetitre.component.html',
  styleUrls: ['./comptetitre.component.css']
})
export class ComptetitreComponent implements OnInit,OnDestroy {

  public user: User;
  private subscriptions: Subscription[] = [];

  public comptes: Compte_titre[];
  public editCompte: Compte_titre;
  public deleteCompte : Compte_titre;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private compteService : ComptetitreService) {}

  ngOnInit(): void {
    this.getCompte();
  }

  public getCompte(): void {
    this.compteService.getComptetitres().subscribe(
      (response: Compte_titre[]) => {
        this.comptes = response;
        console.log(this.comptes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCompte(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-compte-form').click();
    this.compteService.addComptetitre(addForm.value).subscribe(
      (response: Compte_titre) => {
        console.log(response);
        this.getCompte();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCompte(compte: Compte_titre): void {
    this.compteService.updateComptetitre(compte).subscribe(
      (response: Compte_titre) => {
        console.log(response);
        this.getCompte();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCompte(id_comp: number): void {
    this.compteService.deleteComptetitre(id_comp).subscribe(
      (response: void) => {
        console.log(response);
        this.getCompte();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onOpenModal(compte: Compte_titre, mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCompteModal');
    }
    if (mode === 'edit') {
      this.editCompte = compte;
      button.setAttribute('data-target', '#updateCompteModal');
    }
    if (mode === 'delete') {
      this.deleteCompte = compte;
      button.setAttribute('data-target', '#deleteCompteModal');
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
