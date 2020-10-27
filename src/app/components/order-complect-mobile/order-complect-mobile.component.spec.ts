import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComplectMobileComponent } from './order-complect-mobile.component';

describe('OrderComplectMobileComponent', () => {
  let component: OrderComplectMobileComponent;
  let fixture: ComponentFixture<OrderComplectMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderComplectMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComplectMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
