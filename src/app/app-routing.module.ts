import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'currentaccount',
    loadChildren: () =>
      import('./current-account/current-account.module').then(m => m.CurrentAccountModule)
  },
  {
    path: '',
    redirectTo: '/account-statement',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
