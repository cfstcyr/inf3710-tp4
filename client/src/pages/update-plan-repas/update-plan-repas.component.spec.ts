import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlanRepasComponent } from './update-plan-repas.component';

describe('UpdatePlanRepasComponent', () => {
  let component: UpdatePlanRepasComponent;
  let fixture: ComponentFixture<UpdatePlanRepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePlanRepasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePlanRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
