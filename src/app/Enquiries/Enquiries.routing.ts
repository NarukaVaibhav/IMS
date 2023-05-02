import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';

import { NgModule } from '@angular/core';
import { SummaryEnquiryComponent } from './summary-enquiry/summary-enquiry.component';
import { EditEnquiryComponent } from './edit-enquiry/edit-enquiry.component';
import { AddEnquiryComponent } from './add-enquiry/add-enquiry.component';
import { ViewAllEnquiryComponent } from './view-all-enquiry/view-all-enquiry.component';

export const routes: Routes = [
    // { path: '',redirectTo:'view-enquiry',pathMatch:'full' },
    { path : 'add-enquiry', component: AddEnquiryComponent }, 
    { path : 'edit-enquiry' , component : EditEnquiryComponent},
    { path : 'enquiry-summary', component : SummaryEnquiryComponent},
    { path : 'view-enquiry', component: ViewAllEnquiryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquiriesRoutingModule { }