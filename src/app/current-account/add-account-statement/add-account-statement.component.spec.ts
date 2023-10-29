import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountStatementComponent } from './add-account-statement.component';

describe('AddAccountStatementComponent', () => {
  let component: AddAccountStatementComponent;
  let fixture: ComponentFixture<AddAccountStatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAccountStatementComponent]
    });
    fixture = TestBed.createComponent(AddAccountStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
