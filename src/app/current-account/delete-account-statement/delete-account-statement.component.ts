import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { CurrentAccountService } from '../services/current-account.service';
import { CurrentAccountStatement } from '../models/currentAccountStatement';

@Component({
  selector: 'app-delete-account-statement',
  templateUrl: './delete-account-statement.component.html',
  styleUrls: ['./delete-account-statement.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule
  ]
})
export class DeleteAccountStatementComponent extends FormBaseComponent {
  errors: any[] = [];

  constructor(
    private accountStatementService: CurrentAccountService,
    snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteAccountStatementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CurrentAccountStatement
  ) { super(snackBar); }

  deleteStatement(): void {
    this.openSnackBar('Processando solicitação...');
    console.log(this.data.id);

    this.accountStatementService.cancelStatement(this.data.id).subscribe({
      next: () => {
        this.openSnackBar('Cancelado com sucesso!');
        this.errors = [];
        this.dialogRef.close(true);
      },
      error: (e) => {
        this.errors = e.error.errors;
        this.openSnackBar(this.errors[0]);
        this.dialogRef.close(true);
      },
    });
  }
}
