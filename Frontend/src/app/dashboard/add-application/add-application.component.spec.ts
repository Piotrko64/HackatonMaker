import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationComponent } from './add-application.component';

describe('AddApplicationComponent', () => {
  let component: AddApplicationComponent;
  let fixture: ComponentFixture<AddApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddApplicationComponent]
    });
    fixture = TestBed.createComponent(AddApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
