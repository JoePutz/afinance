import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BreakpointDetectorComponent} from './breakpoint-detector.component';

describe('BreakpointDetectorComponent', () => {
  let component: BreakpointDetectorComponent;
  let fixture: ComponentFixture<BreakpointDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakpointDetectorComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakpointDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
