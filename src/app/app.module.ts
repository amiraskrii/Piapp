import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthenticationService} from "./service/authentication.service";
import {UserService} from "./service/user.service";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {NotificationModule} from "./notification.module";
import {NotificationService} from "./service/notification.service";
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ActionComponent } from './component/action/action.component';
import { AccountComponent } from './component/account/account.component';
import { ComptetitreComponent } from './component/comptetitre/comptetitre.component';
import { CongeComponent } from './component/conge/conge.component';
import { CreditcardComponent } from './component/creditcard/creditcard.component';
import { FormationComponent } from './component/formation/formation.component';
import { MessageComponent } from './component/message/message.component';
import { ObligationComponent } from './component/obligation/obligation.component';
import { OrdreComponent } from './component/ordre/ordre.component';
import { ReclamationassuranceComponent } from './component/reclamationassurance/reclamationassurance.component';
import { SalaireComponent } from './component/salaire/salaire.component';
import { SimulateurcreditComponent } from './component/simulateurcredit/simulateurcredit.component';
import { SimulateurepargneComponent } from './component/simulateurepargne/simulateurepargne.component';
import { TransactionComponent } from './component/transaction/transaction.component';
import {AccountService} from "./service/account.service";
import {ActionService} from "./service/action.service";
import {ComptetitreService} from "./service/comptetitre.service";
import {CongeService} from "./service/conge.service";
import {CreditcardService} from "./service/creditcard.service";
import {FormationService} from "./service/formation.service";
import {MessageService} from "./service/message.service";
import {ObligationService} from "./service/obligation.service";
import {OrdreService} from "./service/ordre.service";
import {ReclamationassuranceService} from "./service/reclamationassurance.service";
import {SalaireService} from "./service/salaire.service";
import {SimuateurcreditService} from "./service/simuateurcredit.service";
import {SimuateurepargneService} from "./service/simuateurepargne.service";
import {TransactionService} from "./service/transaction.service";
import { UserComponent } from './component/user/user.component';
import {FormsModule} from "@angular/forms";
import { AgentComponent } from './component/agent/agent.component';
import { ClientComponent } from './component/client/client.component';
import { AccountclientComponent } from './component/accountclient/accountclient.component';
import { ActionclientComponent } from './component/actionclient/actionclient.component';
import { ComptetitreclientComponent } from './component/comptetitreclient/comptetitreclient.component';
import { CongeclientComponent } from './component/congeclient/congeclient.component';
import { CreditcardclientComponent } from './component/creditcardclient/creditcardclient.component';
import { FormationclientComponent } from './component/formationclient/formationclient.component';
import { MessageclientComponent } from './component/messageclient/messageclient.component';
import { ObligationclientComponent } from './component/obligationclient/obligationclient.component';
import { OrdreclientComponent } from './component/ordreclient/ordreclient.component';
import { ReclamationAssuranceclientComponent } from './component/reclamation-assuranceclient/reclamation-assuranceclient.component';
import { SalaireclientComponent } from './component/salaireclient/salaireclient.component';
import { TransactionclientComponent } from './component/transactionclient/transactionclient.component';
import { SimulateurcreditclientComponent } from './component/simulateurcreditclient/simulateurcreditclient.component';
import { SimulateurepargneclientComponent } from './component/simulateurepargneclient/simulateurepargneclient.component';
import { SimulateurepargneagentComponent } from './component/simulateurepargneagent/simulateurepargneagent.component';
import { SimulateurcreditagentComponent } from './component/simulateurcreditagent/simulateurcreditagent.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ActionComponent,
    AccountComponent,
    ComptetitreComponent,
    CongeComponent,
    CreditcardComponent,
    FormationComponent,
    MessageComponent,
    ObligationComponent,
    OrdreComponent,
    ReclamationassuranceComponent,
    SalaireComponent,
    SimulateurcreditComponent,
    SimulateurepargneComponent,
    TransactionComponent,
    UserComponent,
    AgentComponent,
    ClientComponent,
    AccountclientComponent,
    ActionclientComponent,
    ComptetitreclientComponent,
    CongeclientComponent,
    CreditcardclientComponent,
    FormationclientComponent,
    MessageclientComponent,
    ObligationclientComponent,
    OrdreclientComponent,
    ReclamationAssuranceclientComponent,
    SalaireclientComponent,
    TransactionclientComponent,
    SimulateurcreditclientComponent,
    SimulateurepargneclientComponent,
    SimulateurepargneagentComponent,
    SimulateurcreditagentComponent,
    ResetpasswordComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NotificationModule,
        FormsModule
    ],
  providers: [NotificationService,
    AuthenticationGuard,
    AuthenticationService,
    UserService,
    AccountService,
    ActionService,
    ComptetitreService,
    CongeService,
    CreditcardService,
    FormationService,
    MessageService,
    ObligationService,
    OrdreService,
    ReclamationassuranceService,
    SalaireService,
    SimuateurcreditService,
    SimuateurepargneService,
    TransactionService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
