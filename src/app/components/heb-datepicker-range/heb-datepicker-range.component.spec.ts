import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HebDatepickerRangeComponent } from './heb-datepicker-range.component';

describe('HebDatepickerRangeComponent', () => {
  let component: HebDatepickerRangeComponent;
  let fixture: ComponentFixture<HebDatepickerRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HebDatepickerRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HebDatepickerRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
