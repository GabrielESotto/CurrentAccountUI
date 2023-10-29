import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { CurrentAccountStatement } from '../models/currentAccountStatement';
import { CurrentAccountService } from '../services/current-account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxCurrencyDirective } from 'ngx-currency';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-account-statement',
  templateUrl: './add-account-statement.component.html',
  styleUrls: ['./add-account-statement.component.css'],
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
    MatDatepickerModule
  ],
})
export class AddAccountStatementComponent extends FormBaseComponent {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];
  accountStatementForm!: FormGroup;
  accountStatement!: CurrentAccountStatement;
  errors: any[] = [];

  constructor(
    private accountStatementService: CurrentAccountService,
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddAccountStatementComponent>
  ) {
    super(snackBar);

    this.validationMessages = {
      description: {
        required: 'Descrição é um campo obrigatorio',
      },
      value: {
        required: 'Valor é um campo obrigatorio',
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {
    this.accountStatementForm = this.fb.group({
      description: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(
      this.formInputElements,
      this.accountStatementForm
    );
  }

  deposit(): void {
    if (!this.accountStatementForm.valid) return;

    this.accountStatement = Object.assign(
      {},
      this.accountStatement,
      this.accountStatementForm.value
    );

    this.openSnackBar('Processando solicitação...');

    this.accountStatementService.addStatement(this.accountStatement).subscribe({
      next: () => {
        this.openSnackBar('Depositado com sucesso!');
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
