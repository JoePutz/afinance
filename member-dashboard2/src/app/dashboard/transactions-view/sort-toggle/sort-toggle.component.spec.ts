import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SortToggleComponent} from './sort-toggle.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('SortToggleComponent', () => {
  let component: SortToggleComponent;
  let fixture: ComponentFixture<SortToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortToggleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
