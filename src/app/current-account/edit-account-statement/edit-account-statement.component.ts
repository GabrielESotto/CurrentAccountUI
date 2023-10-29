import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, ElementRef, Inject, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { CurrentAccountStatement } from '../models/currentAccountStatement';
import { CurrentAccountService } from '../services/current-account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxCurrencyDirective } from 'ngx-currency';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-edit-account-statement',
  templateUrl: './edit-account-statement.component.html',
  styleUrls: ['./edit-account-statement.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxCurrencyDirective,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class EditAccountStatementComponent extends FormBaseComponent {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];
  accountStatementForm!: FormGroup;
  accountStatement!: CurrentAccountStatement;
  errors: any[] = [];

  constructor(
    private accountStatementService: CurrentAccountService,
    private currencyPipe: CurrencyPipe,
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditAccountStatementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CurrentAccountStatement
  ) {
    super(snackBar);

    this.validationMessages = {
      description: {
        required: 'Descrição é um campo obrigatório',
      },
      date: {
        required: 'Data é um campo obrigatório'
      },
      value: {
        required: 'Valor é um campo obrigatório',
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {
    this.accountStatementForm = this.fb.group({
      id: [this.data.id, Validators.required],
      description: [{value: this.data.description, disabled: true}, Validators.required],
      date: [this.data.date, Validators.required],
      value: [this.data.value, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(
      this.formInputElements,
      this.accountStatementForm
    );
  }

  editStatement(): void {
    if (!this.accountStatementForm.valid) return;

    this.accountStatement = Object.assign(
      {},
      this.accountStatement,
      this.accountStatementForm.value
    );

    this.openSnackBar('Processando solicitação...');

    this.accountStatementService
      .updateStatement(this.accountStatement)
      .subscribe({
        next: () => {
          this.openSnackBar('Editado com sucesso!');
          this.accountStatementForm.reset();
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
