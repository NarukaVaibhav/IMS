import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';

import { ReceiptAllComponent } from './receipt-all/receipt-all.component';
import { PrintReceiptComponent } from './print-receipt/print-receipt.component';
import { ReceiptComponent } from './receipt/receipt.component';

export const routes: Routes = [
  // { path: '',redirectTo:'reciept',pathMatch:'full' },
  { path : 'receipt' , component: ReceiptAllComponent},
  { path : 'print-receipt/:id' ,component : PrintReceiptComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptRoutingModule { }