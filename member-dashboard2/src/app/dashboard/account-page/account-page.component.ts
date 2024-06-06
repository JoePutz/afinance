import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '@core/services/account.service';
import {AccountResponse} from '@core/models/account-response.model';
import {DashboardRoutingService} from '@dashboard/dashboard-routing.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.sass']
})
export class AccountPageComponent implements OnInit {

  account?: AccountResponse;

  constructor(private service: AccountService,
              private route: ActivatedRoute,
              private routeService: DashboardRoutingService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        const accountId = params.id!;
        this.service.getAccountById(accountId)
          .subscribe(account => {
            this.account = account;
          });
      });
  }

  goBack() {
    this.routeService.back();
  }

}
