import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountStatementComponent } from "./account-statement/account-statement.component";

const routes: Routes = [
  {
    path: 'account-statement',
    component: AccountStatementComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CurrentAccountRoutingModule {}
