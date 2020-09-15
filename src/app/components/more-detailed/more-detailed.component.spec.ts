import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDetailedComponent } from './more-detailed.component';

describe('MoreDetailedComponent', () => {
  let component: MoreDetailedComponent;
  let fixture: ComponentFixture<MoreDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
