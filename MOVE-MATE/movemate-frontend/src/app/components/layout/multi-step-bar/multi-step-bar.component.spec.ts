import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiStepBarComponent } from './multi-step-bar.component';

describe('MultiStepBarComponent', () => {
  let component: MultiStepBarComponent;
  let fixture: ComponentFixture<MultiStepBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiStepBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiStepBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
