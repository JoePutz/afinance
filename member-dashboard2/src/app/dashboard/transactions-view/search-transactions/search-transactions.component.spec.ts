import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchTransactionsComponent} from './search-transactions.component';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('SearchTransactionsComponent', () => {
  let component: SearchTransactionsComponent;
  let fixture: ComponentFixture<SearchTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SearchTransactionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
