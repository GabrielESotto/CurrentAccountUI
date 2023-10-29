import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountStatementComponent } from './edit-account-statement.component';

describe('EditAccountStatementComponent', () => {
  let component: EditAccountStatementComponent;
  let fixture: ComponentFixture<EditAccountStatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAccountStatementComponent]
    });
    fixture = TestBed.createComponent(EditAccountStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
