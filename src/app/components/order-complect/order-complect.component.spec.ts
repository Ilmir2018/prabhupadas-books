import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComplectComponent } from './order-complect.component';

describe('OrderComplectComponent', () => {
  let component: OrderComplectComponent;
  let fixture: ComponentFixture<OrderComplectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderComplectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComplectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
