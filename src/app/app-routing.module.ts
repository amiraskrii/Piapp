import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {AccountComponent} from "./component/account/account.component";
import {ActionComponent} from "./component/action/action.component";
import {ComptetitreComponent} from "./component/comptetitre/comptetitre.component";
import {CongeComponent} from "./component/conge/conge.component";
import {CreditcardComponent} from "./component/creditcard/creditcard.component";
import {FormationComponent} from "./component/formation/formation.component";
import {MessageComponent} from "./component/message/message.component";
import {SalaireComponent} from "./component/salaire/salaire.component";
import {TransactionComponent} from "./component/transaction/transaction.component";
import {SimulateurcreditComponent} from "./component/simulateurcredit/simulateurcredit.component";
import {SimulateurepargneComponent} from "./component/simulateurepargne/simulateurepargne.component";
import {AgentComponent} from "./component/agent/agent.component";
import {ClientComponent} from "./component/client/client.component";
import {OrdreComponent} from "./component/ordre/ordre.component";
import {ObligationComponent} from "./component/obligation/obligation.component";
import {ReclamationassuranceComponent} from "./component/reclamationassurance/reclamationassurance.component";
import {UserComponent} from "./component/user/user.component";
import {AccountclientComponent} from "./component/accountclient/accountclient.component";
import {ActionclientComponent} from "./component/actionclient/actionclient.component";
import {ComptetitreclientComponent} from "./component/comptetitreclient/comptetitreclient.component";
import {CongeclientComponent} from "./component/congeclient/congeclient.component";
import {CreditcardclientComponent} from "./component/creditcardclient/creditcardclient.component";
import {FormationclientComponent} from "./component/formationclient/formationclient.component";
import {MessageclientComponent} from "./component/messageclient/messageclient.component";
import {ObligationclientComponent} from "./component/obligationclient/obligationclient.component";
import {OrdreclientComponent} from "./component/ordreclient/ordreclient.component";
import {SalaireclientComponent} from "./component/salaireclient/salaireclient.component";
import {ReclamationAssuranceclientComponent} from "./component/reclamation-assuranceclient/reclamation-assuranceclient.component";
import {TransactionclientComponent} from "./component/transactionclient/transactionclient.component";
import {SimulateurcreditclientComponent} from "./component/simulateurcreditclient/simulateurcreditclient.component";
import {SimulateurepargneclientComponent} from "./component/simulateurepargneclient/simulateurepargneclient.component";
import {SimulateurcreditagentComponent} from "./component/simulateurcreditagent/simulateurcreditagent.component";
import {SimulateurepargneagentComponent} from "./component/simulateurepargneagent/simulateurepargneagent.component";
import {ResetpasswordComponent} from "./component/resetpassword/resetpassword.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'agent', component: AgentComponent },
  { path: 'client', component: ClientComponent },
  { path: 'account', component: AccountComponent },
  { path: 'accountt', component: AccountclientComponent },
  { path: 'action', component: ActionComponent },
  { path: 'actionn', component: ActionclientComponent },
  { path: 'compte', component: ComptetitreComponent },
  { path: 'comptee', component: ComptetitreclientComponent },
  { path: 'conge', component: CongeComponent },
  { path: 'congee', component: CongeclientComponent },
  { path: 'card', component: CreditcardComponent },
  { path: 'cardd', component: CreditcardclientComponent },
  { path: 'formation', component: FormationComponent },
  { path: 'formationn', component: FormationclientComponent },
  { path: 'message', component: MessageComponent },
  { path: 'messagee', component: MessageclientComponent },
  { path: 'obligation', component: ObligationComponent },
  { path: 'obligationn', component: ObligationclientComponent },
  { path: 'ordre', component: OrdreComponent },
  { path: 'ordree', component: OrdreclientComponent },
  { path: 'salaire', component: SalaireComponent },
  { path: 'salairee', component: SalaireclientComponent },
  { path: 'reclamation', component: ReclamationassuranceComponent },
  { path: 'reclamationn', component: ReclamationAssuranceclientComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'transactionn', component: TransactionclientComponent },
  { path: 'user', component: UserComponent },
  { path: 'scredi', component: SimulateurcreditComponent },
  { path: 'separgne', component: SimulateurepargneComponent },
  { path: 'scredic', component: SimulateurcreditclientComponent },
  { path: 'separgnec', component: SimulateurepargneclientComponent },
  { path: 'scredia', component: SimulateurcreditagentComponent },
  { path: 'separgnea', component: SimulateurepargneagentComponent },
  { path: 'reset', component: ResetpasswordComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
