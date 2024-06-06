import {Component, Input} from '@angular/core';
import {Transaction} from '@core/models/transaction.model';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.sass']
})
export class TransactionsTableComponent {

  @Input()
  transactions!: Transaction[];

  constructor() { }

}
