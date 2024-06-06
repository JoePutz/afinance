import {Component, Input} from '@angular/core';
import {Transaction, TransactionType} from '@core/models/transaction.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction-row',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.sass']
})
export class TransactionRowComponent {

  @Input()
  transaction!: Transaction;

  constructor(private modalService: NgbModal) { }

  isDecreasing(transaction: Transaction): boolean {
    switch (transaction.type) {
      case TransactionType.PAYMENT:
      case TransactionType.PURCHASE:
      case TransactionType.TRANSFER_OUT:
      case TransactionType.WITHDRAWAL:
        return true;
      default:
        return false;
    }
  }

  isIncreasing(transaction: Transaction): boolean {
    switch (transaction.type) {
      case TransactionType.DEPOSIT:
      case TransactionType.TRANSFER_IN:
      case TransactionType.REFUND:
        return true;
      default:
        return false;
    }
  }

  open(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
      centered: true
    });
  }

}
