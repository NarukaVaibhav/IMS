import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { NgModule } from '@angular/core';

import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { EditFeedbackComponent } from './edit-feedback/edit-feedback.component';
import { SummaryFeedbackComponent } from './summary-feedback/summary-feedback.component';
import { AddEmployeeFeedbackComponent } from './add-employee-feedback/add-employee-feedback.component';
import { ViewEmployeeFeedbackComponent } from './view-employee-feedback/view-employee-feedback.component';


export const routes: Routes = [
  // { path: '',redirectTo:'feedback-view',pathMatch:'full' },
  { path : 'add-feedback', component: AddFeedbackComponent },
  { path : 'add-employee-feedback', component: AddEmployeeFeedbackComponent },
  { path : 'view-employee-feedback', component: ViewEmployeeFeedbackComponent },
  { path : 'feedback-view', component: ViewAllComponent },
  { path : 'edit-feedback/:id' ,component: EditFeedbackComponent},
  { path : 'feedback-summary', component: SummaryFeedbackComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }