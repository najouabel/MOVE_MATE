import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterUpperSectionComponent } from './footer-upper-section.component';

describe('FooterUpperSectionComponent', () => {
  let component: FooterUpperSectionComponent;
  let fixture: ComponentFixture<FooterUpperSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterUpperSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterUpperSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
