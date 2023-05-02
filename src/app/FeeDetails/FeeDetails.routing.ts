import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';

import { FeeDetailsComponent } from './fee-details/fee-details.component';
import { FeeReceiptComponent } from './fee-receipt/fee-receipt.component';

export const routes: Routes = [
  // { path: '',redirectTo:'feedetails',pathMatch:'full' },
  { path : 'feedetails', component: FeeDetailsComponent},
  { path : 'fee-receipt', component: FeeReceiptComponent}
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeDetailsRoutingModule { }