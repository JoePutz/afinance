import {Component, OnInit} from '@angular/core';
import {AccountResponse} from '@core/models/account-response.model';
import {AccountService} from '@core/services/account.service';
import {AuthService} from '@core/services/auth.service';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.sass']
})
export class AccountsDashboardComponent implements OnInit {

  accounts?: AccountResponse[];

  constructor(private accountService: AccountService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.authService.currentUser.subscribe(
      user => {
        if (user) {
          this.accountService.getAccounts(user?.memberId).subscribe(
            accounts => {
              if (accounts) {
                this.accounts = accounts.content;
              }
            }
          );
        }
      }
    );
  }

}
