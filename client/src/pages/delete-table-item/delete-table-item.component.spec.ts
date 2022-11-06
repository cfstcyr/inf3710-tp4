import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTableItemComponent } from './delete-table-item.component';

describe('DeleteTableItemComponent', () => {
  let component: DeleteTableItemComponent;
  let fixture: ComponentFixture<DeleteTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTableItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
