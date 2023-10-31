import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddAccountStatementComponent } from "./add-account-statement.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CurrentAccountService } from "../services/current-account.service";
import { DebugElement } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

const dialogMock = {
  close: () => {}
}

describe('AddAccountStatementComponent', () => {
  let component: AddAccountStatementComponent;
  let fixture: ComponentFixture<AddAccountStatementComponent>;
  let el: DebugElement;
  let currentAccountServiceSpy: jasmine.SpyObj<CurrentAccountService>;
  let matDialogSpy: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(() => {
    matDialogSpy = jasmine.createSpyObj('MatDialogRef', ['open', 'close']);
    currentAccountServiceSpy = jasmine.createSpyObj('CurrentAccountService', [
      'getAllStatement',
      'getStatementById',
      'addStatement',
      'updateStatement',
      'cancelStatement',
    ]);

    TestBed.configureTestingModule({
      imports: [AddAccountStatementComponent, BrowserAnimationsModule, MatSnackBarModule, MatDialogModule],
      providers: [
        { provide: CurrentAccountService, useValue: currentAccountServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: dialogMock },
        { provide: MatDialogRef, useValue: matDialogSpy },
      ],
    });

    fixture = TestBed.createComponent(AddAccountStatementComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
