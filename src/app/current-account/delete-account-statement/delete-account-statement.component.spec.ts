import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountStatementComponent } from './delete-account-statement.component';

describe('DeleteAccountStatementComponent', () => {
  let component: DeleteAccountStatementComponent;
  let fixture: ComponentFixture<DeleteAccountStatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAccountStatementComponent]
    });
    fixture = TestBed.createComponent(DeleteAccountStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
