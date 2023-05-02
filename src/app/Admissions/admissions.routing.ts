import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';

import { AddNewComponent } from './add-new/add-new.component';
import { TableViewComponent } from './table-view/table-view.component';
import { IndividualAttendenceShowComponent } from './individual-attendence-show/individual-attendence-show.component';
import { EditAdmissionComponent } from './edit-admission/edit-admission.component';
import { IndividualResultsComponent } from './individual-results/individual-results.component';
import { IndividualSubmissionComponent } from './individual-submission/individual-submission.component';
import { IndividualFeedbackComponent } from './individual-feedback/individual-feedback.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    // // { path: '',redirectTo:'view-admissions',pathMatch:'full' },
    { path: 'add-new-admission', component: AddNewComponent},
    { path: 'view-admissions', component: TableViewComponent},
    { path: 'individual-attendance/:id', component: IndividualAttendenceShowComponent},
    { path: 'individual-feedback', component: IndividualFeedbackComponent},
    { path: 'individual-result', component: IndividualResultsComponent},
    { path: 'individual-assignments', component: IndividualSubmissionComponent},
    { path: 'edit-admissions/:id', component: EditAdmissionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionsRoutingModule { }
