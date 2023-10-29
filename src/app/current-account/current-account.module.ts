import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from '@angular/common';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { CurrentAccountRoutingModule } from './current-account.routing';
import { CurrentAccountService } from './services/current-account.service';
import localePt from '@angular/common/locales/pt';
import { AddAccountStatementComponent } from './add-account-statement/add-account-statement.component';
import { EditAccountStatementComponent } from './edit-account-statement/edit-account-statement.component';
import { DeleteAccountStatementComponent } from './delete-account-statement/delete-account-statement.component';

registerLocaleData(localePt)

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CurrentAccountRoutingModule,
    AccountStatementComponent,
    AddAccountStatementComponent,
    EditAccountStatementComponent,
    DeleteAccountStatementComponent,
  ],
  providers: [
    CurrentAccountService,
    CurrencyPipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'shortDate' },
    },
  ],
})
export class CurrentAccountModule {}
