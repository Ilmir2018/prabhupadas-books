import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDetailedMobileComponent } from './more-detailed-mobile.component';

describe('MoreDetailedMobileComponent', () => {
  let component: MoreDetailedMobileComponent;
  let fixture: ComponentFixture<MoreDetailedMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreDetailedMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreDetailedMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
