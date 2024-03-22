import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationQuoteComponent } from './reservation-quote.component';

describe('ReservationQuoteComponent', () => {
  let component: ReservationQuoteComponent;
  let fixture: ComponentFixture<ReservationQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationQuoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
