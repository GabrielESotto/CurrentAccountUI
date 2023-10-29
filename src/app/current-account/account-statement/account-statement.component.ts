import { Component, ViewChild } from '@angular/core';
import { FooterComponent } from 'src/app/navigation/footer/footer.component';
import { MenuComponent } from 'src/app/navigation/menu/menu.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CurrentAccountService } from '../services/current-account.service';
import { CurrentAccountStatement } from '../models/currentAccountStatement';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddAccountStatementComponent } from '../add-account-statement/add-account-statement.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditAccountStatementComponent } from '../edit-account-statement/edit-account-statement.component';
import { DeleteAccountStatementComponent } from '../delete-account-statement/delete-account-statement.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface Dates {
  dateFromBack: Date;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css'],
  standalone: true,
  imports: [
    FooterComponent,
    MenuComponent,
    MatTableModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    DatePipe,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSortModule,
  ],
})
export class AccountStatementComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private accountStatementService: CurrentAccountService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filteredAccountStatementData: CurrentAccountStatement[] = [];
  accountStatementData: CurrentAccountStatement[] = [];
  displayedColumns: string[] = [
    'description',
    'value',
    'date',
    'detached',
    'status',
    'options',
  ];
  dataSource: MatTableDataSource<CurrentAccountStatement> =
    new MatTableDataSource();
  conditionToDisable: boolean = false;
  dataAtual: Date = new Date();
  dataFinal = new Date(this.dataAtual.getTime() - 2 * 24 * 60 * 60 * 1000);
  dateForm = new FormGroup({
    start: new FormControl<Date | any>(this.dataFinal),
    end: new FormControl<Date | any>(this.dataAtual),
  });

  ngOnInit(): void {
    this.getAccountStatements();
  }

  getFormatedDates(statement: CurrentAccountStatement): Dates {
    let dateFromBack = new Date(statement.date);
    let endDate = new Date(this.dateForm.value.end);
    let startDate = new Date(this.dateForm.value.start);

    let formatedDateFromBack = new Date(
      dateFromBack.getFullYear(),
      dateFromBack.getMonth(),
      dateFromBack.getDate()
    );
    let formatedStartDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    let formatedEndDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );

    let dates = {
      dateFromBack: formatedDateFromBack,
      startDate: formatedStartDate,
      endDate: formatedEndDate,
    };

    return dates;
  }

  validateRangeDate(result: CurrentAccountStatement[]): void {
    result.forEach((statement) => {
      let dates: Dates = this.getFormatedDates(statement);

      if (
        dates.dateFromBack >= dates.startDate &&
        dates.dateFromBack <= dates.endDate
      ) {
        this.accountStatementData.push(statement);
      }
    });
  }

  updateTable(): void {
    this.dataSource = new MatTableDataSource<CurrentAccountStatement>(
      this.accountStatementData
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.spinner.hide();
  }

  getAccountStatements(): void {
    this.accountStatementData = [];
    this.spinner.show();

    this.accountStatementService.getAllStatement().subscribe({
      next: (result) => {
        this.validateRangeDate(result);
        this.updateTable();
      },
      error: (e) => {
        console.log(e);
        this.spinner.hide();
      },
    });

    this.spinner.hide();
  }

  sumAllStatements(): number {
    let totalValue: number = 0;

    this.accountStatementData.forEach((statement) => {
      if (statement.status === 0) totalValue += statement.value;
    });

    return totalValue;
  }

  actionAfterClosed(dialog: MatDialogRef<any, any>): void {
    dialog.afterClosed().subscribe((result) => {
      if (result) this.getAccountStatements();
    });
  }

  openAddDialog(): void {
    let createDialog = this.dialog.open(AddAccountStatementComponent, {
      width: '400px',
      height: '400px',
    });

    this.actionAfterClosed(createDialog);
  }

  openEditDialog(accountStatement: CurrentAccountStatement): void {
    let editDialog = this.dialog.open(EditAccountStatementComponent, {
      width: '400px',
      height: '400px',
      data: {
        id: accountStatement.id,
        description: accountStatement.description,
        date: accountStatement.date,
        value: accountStatement.value,
      },
    });

    this.actionAfterClosed(editDialog);
  }

  openCancelDialog(accountStatement: CurrentAccountStatement): void {
    let cancelDialog = this.dialog.open(DeleteAccountStatementComponent, {
      width: '450px',
      height: '220px',
      data: {
        id: accountStatement.id,
      },
    });

    this.actionAfterClosed(cancelDialog);
  }
}
