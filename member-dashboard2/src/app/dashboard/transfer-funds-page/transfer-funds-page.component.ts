import {Component, OnInit} from '@angular/core';
import {DashboardRoutingService} from '@dashboard/dashboard-routing.service';
import {AccountService} from '@core/services/account.service';
import {AccountResponse} from '@core/models/account-response.model';
import {AuthService} from '@core/services/auth.service';
import {SelectedAccounts} from '../transfer-funds-view/transfer-funds-view.component';

@Component({
  selector: 'app-transfer-funds-page',
  templateUrl: './transfer-funds-page.component.html',
  styleUrls: ['./transfer-funds-page.component.sass']
})
export class TransferFundsPageComponent implements OnInit {

  fromAccount?: AccountResponse;
  toAccount?: AccountResponse;
  accounts!: AccountResponse[];

  constructor(private routeService: DashboardRoutingService,
              private accountService: AccountService,
              private authService: AuthService) { }

  ngOnInit() {
    this.loadAccounts();
  }

  goBack() {
    this.routeService.back();
  }

  loadAccounts() {
    this.authService.currentUser.subscribe(
      user => {
        if (user) {
          this.accountService.getAccounts(user?.memberId).subscribe(
            accounts => {
              if (accounts) {
                this.accounts = accounts.content;
                if (this.fromAccount) {
                  const fromAccountNumber = this.fromAccount.accountNumber;
                  this.fromAccount = this.accounts.filter(account => account.accountNumber === fromAccountNumber)[0];
                }

                if (this.toAccount) {
                  const toAccountNumber = this.toAccount.accountNumber;
                  this.toAccount = this.accounts.filter(account => account.accountNumber === toAccountNumber)[0];
                }
              }
            }
          );
        }
      }
    );
  }

  onSelectAccounts({fromAccount, toAccount}: SelectedAccounts) {
    this.fromAccount = fromAccount;
    this.toAccount = toAccount;
  }

}
