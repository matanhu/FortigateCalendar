import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HebDatePickerComponent } from './heb-date-picker.component';

describe('HebDatePickerComponent', () => {
  let component: HebDatePickerComponent;
  let fixture: ComponentFixture<HebDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HebDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HebDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
