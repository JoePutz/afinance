import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionsViewComponent} from './transactions-view.component';
import {AuthService} from '@core/services/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TransactionService} from '@core/services/transaction.service';

describe('TransactionsViewComponent', () => {
  let component: TransactionsViewComponent;
  let fixture: ComponentFixture<TransactionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TransactionsViewComponent],
      providers: [
        AuthService,
        TransactionService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
