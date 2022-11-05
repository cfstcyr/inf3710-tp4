import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlanRepasComponent } from './delete-plan-repas.component';

describe('DeletePlanRepasComponent', () => {
  let component: DeletePlanRepasComponent;
  let fixture: ComponentFixture<DeletePlanRepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePlanRepasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePlanRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
