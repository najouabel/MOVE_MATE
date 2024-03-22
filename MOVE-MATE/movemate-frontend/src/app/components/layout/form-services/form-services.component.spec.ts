import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormServicesComponent } from './form-services.component';

describe('FormServicesComponent', () => {
  let component: FormServicesComponent;
  let fixture: ComponentFixture<FormServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
