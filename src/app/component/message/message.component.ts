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
import {Message} from "../../model/message";
import {MessageService} from "../../service/message.service";
import {Role} from "../../enum/role.enum";
import {Etat} from "../../enum/etat";
import {StatisticService} from "../../service/statistic.service";
import {Statistictempsmsg} from "../../model/statistictempsmsg";
import {Statisticcountmsg} from "../../model/statisticcountmsg";
import {Statmesrep} from "../../model/statmesrep";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit,OnDestroy {

  public user: User;
  public message : Message;
  private subscriptions: Subscription[] = [];

  public etaa : Etat ;

  public messages: Message[];
  public editMessage: Message;
  public deleteMessage : Message;

  public statistictempsmsg :Statistictempsmsg ;
  public statisticcountmsg :Statisticcountmsg;
  public statmsgrep : Statmesrep ;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService, private messageService : MessageService,private statisticService : StatisticService) {}

  ngOnInit(): void {
this.getMessages();
this.getstatsticcountmsg();
this.getstatstisumtempsmsg();
this.getstatsticcountmsgrep();


  }

  public getMessages(): void {
    this.messageService.getMessages().subscribe(
      (response: Message[]) => {
        this.messages = response;
        console.log(this.messages);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getstatsticcountmsg(): void {
    this.statisticService.getmessagecount().subscribe(
      (response: Statisticcountmsg) => {
        this.statisticcountmsg = response;
        console.log(this.messages);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getstatsticcountmsgrep(): void {
    this.statisticService.getsumTempsmesgRep().subscribe(
      (response: Statmesrep) => {
        this.statmsgrep = response;
        console.log(this.messages);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getstatstisumtempsmsg(): void {
    this.statisticService.getsumTempsmesg().subscribe(
      (response: Statistictempsmsg) => {
        this.statistictempsmsg = response;
        console.log(this.messages);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddMessage(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-message-form').click();
    this.messageService.addMessage(addForm.value).subscribe(
      (response: Message) => {
        console.log(response);
        this.getMessages();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateMessage(message: Message): void {
    this.messageService.updateMessage(message).subscribe(
      (response: Message) => {
        console.log(response);
        this.getMessages();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMessage(id_msg: number): void {
    this.messageService.deleteMessage(id_msg).subscribe(
      (response: void) => {
        console.log(response);
        this.getMessages();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onOpenModal(message: Message, mode: string  ): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addMessageModal');
    }
    if (mode === 'edit') {
      this.editMessage = message;
      button.setAttribute('data-target', '#updateMessageModal');
    }
    if (mode === 'delete') {
      this.deleteMessage = message;
      button.setAttribute('data-target', '#deleteMessageModal');
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
