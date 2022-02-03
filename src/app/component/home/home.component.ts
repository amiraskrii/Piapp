import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {FormationService} from "../../service/formation.service";
import {ExchangeService} from "../../service/exchange.service";
import {Subscription} from "rxjs";
import {Formation} from "../../model/formation";
import {HttpErrorResponse} from "@angular/common/http";
import {Exchange, Rate} from "../../model/exchange";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  exchanges$: Exchange[];
  rates$: Rate[];



  constructor(private router: Router, private exchangeService : ExchangeService) { }

  ngOnInit() {
    return this.exchangeService.getExchanges().subscribe(data => this.exchanges$ = data)


  }

  ngOnInit2() {
    return this.exchangeService.getRates().subscribe(data => this.rates$ = data)


  }


}
