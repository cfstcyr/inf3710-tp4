import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanRepasComponent } from './add-plan-repas.component';

describe('AddPlanRepasComponent', () => {
  let component: AddPlanRepasComponent;
  let fixture: ComponentFixture<AddPlanRepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanRepasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlanRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
