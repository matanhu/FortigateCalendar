import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstallationPageComponent } from './new-installation-page.component';

describe('NewInstallationPageComponent', () => {
  let component: NewInstallationPageComponent;
  let fixture: ComponentFixture<NewInstallationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInstallationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInstallationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
