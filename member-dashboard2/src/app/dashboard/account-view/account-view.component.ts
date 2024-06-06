import {Component, Input} from '@angular/core';
import {AccountResponse} from '@core/models/account-response.model';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

export type AccountViewType = 'full' | 'preview' | 'list';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.sass']
})
export class AccountViewComponent {

  @Input()
  viewType: AccountViewType = 'full';

  @Input()
  account?: AccountResponse;

  @Input()
  emptyMessage = 'No account to view.';

  @Input()
  link = false;

  accountNumberVisible = false;

  eyeIcon: IconProp = 'eye';

  constructor() { }

  toggleVisible() {
    this.accountNumberVisible = !this.accountNumberVisible;
    if (this.accountNumberVisible)
      this.eyeIcon = 'eye-slash';
    else this.eyeIcon = 'eye';
  }

}
