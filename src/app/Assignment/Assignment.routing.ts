import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';

import { NgModule } from '@angular/core';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';
import { AssignmentIndividualSubmissionComponent } from './assignment-individual-submission/assignment-individual-submission.component';
import { AssignmentRecordComponent } from './assignment-record/assignment-record.component';
import { AssignmentViewAllComponent } from './assignment-view-all/assignment-view-all.component';
import { AssignmentComponent } from './assignment/assignment.component';

export const routes: Routes = [
    // { path: '',redirectTo:'assignment-ViewAll',pathMatch:'full' },
    { path : 'assignment' , component : AssignmentComponent},
    { path : 'assignment-ViewAll' , component:AssignmentViewAllComponent},
    { path : 'edit-assignment/:id' , component:EditAssignmentComponent},
    { path : 'assignment-record/:id' , component : AssignmentRecordComponent},
    { path : 'individul-submission/:id', component : AssignmentIndividualSubmissionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule { }
