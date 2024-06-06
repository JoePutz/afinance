import {Component, EventEmitter, Input, Output, ViewChild, ViewRef} from '@angular/core';
import {AccountResponse} from '@core/models/account-response.model';
import {TransferFundsRequest} from '@core/models/transfer-funds-request.model';
import {TransactionsViewComponent} from '@dashboard/transactions-view/transactions-view.component';
import {TransactionService} from '@core/services/transaction.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

export type TransferFundsViewMode = 'quick' | 'account' | 'full';
export type SelectedAccounts = {
  fromAccount?: AccountResponse,
  toAccount?: AccountResponse
};

@Component({
  selector: 'app-transfer-funds-view',
  templateUrl: './transfer-funds-view.component.html',
  styleUrls: ['./transfer-funds-view.component.sass']
})
export class TransferFundsViewComponent {

  @Input()
  mode!: TransferFundsViewMode;

  @Input()
  viewTitle = 'Transfer Money';

  @Input()
  accounts!: AccountResponse[];

  @Input()
  resetOnTransfer = true;

  @ViewChild('transferModal')
  modalContent!: ViewRef;

  @ViewChild('sendTransferModal')
  successModalContent!: ViewRef;

  transferAmount = 0;
  fromAccount?: AccountResponse;
  toAccount?: AccountResponse;
  memo = '';

  @Input()
  transactionsView?: TransactionsViewComponent;

  @Output()
  reloadAccounts = new EventEmitter<any>();

  @Output()
  selectAccounts = new EventEmitter<SelectedAccounts>();

  transferring = false;

  constructor(private service: TransactionService,
              private modalService: NgbModal) {
  }

  switchAccounts() {
    const temp = this.fromAccount;
    this.fromAccount = this.toAccount;
    this.toAccount = temp;
    this.onSelectAccounts();
  }

  transferFunds() {
    this.openModal(this.modalContent);
  }

  sendTransferRequests(modal: NgbModalRef) {
    modal.close();
    const request: TransferFundsRequest = {
      fromAccountNumber: this.fromAccount!.accountNumber,
      toAccountNumber: this.toAccount!.accountNumber,
      amount: this.transferAmount * 100,
      memo: this.mode == 'quick' ? 'QUICK TRANSFER' : this.memo
    };
    this.transferring = false;
    this.service.transferFunds(request)
      .subscribe(() => {
        this.transferring = false;
        this.refreshTransactionsComponent();
        this.modalService.open(this.successModalContent, {centered: true});
        this.reloadAccounts.emit();
        this.onSelectAccounts();
        this.resetFields();
      });
  }

  transferAmountTooMuch() {
    return this.transferAmount > (this.fromAccount?.type! === 'CHECKING' ?
      this.fromAccount?.availableBalance! / 100 :
      this.fromAccount?.balance! / 100);
  }

  resetFields() {
    this.transferAmount = 0;
    this.fromAccount = undefined;
    this.toAccount = undefined;
  }

  refreshTransactionsComponent() {
    this.transactionsView?.loadPage();
  }

  onSelectAccounts() {
    this.selectAccounts.emit({
      fromAccount: this.fromAccount,
      toAccount: this.toAccount
    });
  }

  openModal(content: any) {
    return this.modalService.open(content, {
      centered: true
    });
  }

}
