import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';

import { MasterDesignationComponent } from './master-designation/master-designation.component';
import { MasterFollowUpComponent } from './master-follow-up/master-follow-up.component';
import {AdConstraintComponent} from './ad-constraint/ad-constraint.component';
import{AddReceiptMasterComponent} from './add-receipt-master/add-receipt-master.component';
export const routes: Routes = [
  // { path: '',redirectTo:'master-designation',pathMatch:'full' },
  { path : 'master-designation' , component: MasterDesignationComponent},
  { path : 'master-followup' , component: MasterFollowUpComponent},
  { path : 'Pslip' , component: AdConstraintComponent},
  { path : 'AdmissionMaster' , component: AddReceiptMasterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }