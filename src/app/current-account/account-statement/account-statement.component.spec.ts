import { ComponentFixture, TestBed, fakeAsync, flush, tick } from "@angular/core/testing";
import { AccountStatementComponent } from "./account-statement.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CurrentAccountService } from "../services/current-account.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { AccountStatementMock } from "../models/accountStatementMock";

describe('AccountStatementComponent', () => {
  let component: AccountStatementComponent;
  let fixture: ComponentFixture<AccountStatementComponent>;
  let el: DebugElement;
  let currentAccountServiceSpy: jasmine.SpyObj<CurrentAccountService>;

  beforeEach(() => {
    currentAccountServiceSpy = jasmine.createSpyObj('CurrentAccountService', ['getAllStatement', 'getStatementById', 'addStatement', 'updateStatement', 'cancelStatement']);

    TestBed.configureTestingModule({
      imports: [AccountStatementComponent, BrowserAnimationsModule],
      providers: [
        { provide: CurrentAccountService, useValue: currentAccountServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(AccountStatementComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the total div', () => {
    const totalDiv = el.query(By.css('.totalDiv')).nativeElement;
    expect(totalDiv).toBeTruthy();
    expect(totalDiv.innerText).toBe('Total:')
  });

  it('should click in the add button and call the method openAddDialog', fakeAsync(() => {
    spyOn(component, 'openAddDialog');

    const addButton = el.nativeElement.querySelector('.btn-add');
    addButton.click();
    tick();

    expect(component.openAddDialog).toHaveBeenCalled();
  }));

  it('should click in the edit button and call the method openEditDialog', fakeAsync(() => {
    currentAccountServiceSpy.getAllStatement.and.returnValue(of(AccountStatementMock))
    spyOn(component, 'openEditDialog');

    fixture.detectChanges();

    const editButton = el.nativeElement.querySelector('.btn-edit');
    editButton.click();
    tick();

    expect(component.openEditDialog).toHaveBeenCalled();

    flush();
  }));

  it('should click in the cancel button and call the method openCancelDialog', fakeAsync(() => {
    currentAccountServiceSpy.getAllStatement.and.returnValue(of(AccountStatementMock))
    spyOn(component, 'openCancelDialog');

    fixture.detectChanges();

    const cancelButton = el.nativeElement.querySelector('.btn-cancel');
    cancelButton.click();
    tick();

    expect(component.openCancelDialog).toHaveBeenCalled();

    flush();
  }));

  it('should display the table header with correct title', () => {
    currentAccountServiceSpy.getAllStatement.and.returnValue(of(AccountStatementMock))

    fixture.detectChanges();

    const thDescription = el.nativeElement.querySelector('table th:nth-child(1)');
    expect(thDescription.innerText).toBe('Description');

    const thValue = el.nativeElement.querySelector('table th:nth-child(2)');
    expect(thValue.innerText).toBe('Value');

    const thDate = el.nativeElement.querySelector('table th:nth-child(3)');
    expect(thDate.innerText).toBe('Date');

    const thAvulso = el.nativeElement.querySelector('table th:nth-child(4)');
    expect(thAvulso.innerText).toBe('Avulso');

    const thStatus = el.nativeElement.querySelector('table th:nth-child(5)');
    expect(thStatus.innerText).toBe('Status');

    const thOptions = el.nativeElement.querySelector('table th:nth-child(6)');
    expect(thOptions.innerText).toBe('Options');
  })

  it('should call the service method getAllStatements and return the correct data', () => {
    currentAccountServiceSpy.getAllStatement.and.returnValue(of(AccountStatementMock))
    fixture.detectChanges();

    expect(component.accountStatementData).toEqual(AccountStatementMock);
    expect(component.accountStatementData.length).toBe(3);
    expect(component.accountStatementData[0].value).toBe(519.9)
  })
});
