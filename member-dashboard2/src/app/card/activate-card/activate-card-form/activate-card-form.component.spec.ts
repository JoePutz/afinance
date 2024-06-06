import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateCardFormComponent } from './activate-card-form.component';

describe('ActivateCardFormComponent', () => {
  let component: ActivateCardFormComponent;
  let fixture: ComponentFixture<ActivateCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateCardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
