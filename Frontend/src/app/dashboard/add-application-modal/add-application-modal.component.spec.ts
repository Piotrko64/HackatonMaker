import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationModalComponent } from './add-application-modal.component';

describe('AddApplicationModalComponent', () => {
  let component: AddApplicationModalComponent;
  let fixture: ComponentFixture<AddApplicationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddApplicationModalComponent]
    });
    fixture = TestBed.createComponent(AddApplicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
